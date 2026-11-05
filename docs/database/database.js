'use strict';
const panel = document.querySelector('#panel');
const tabs = document.querySelector('nav');
const names = ['ER diagram', 'Schema diagram', 'Tables', 'SQL script', 'Rules'];
const colors = ['#87472f','#625084','#386049','#426179','#8a4d31','#765125','#67544c'];
const groups = [...new Set(DATA.tables.map(table => table.group))];
const tables = new Map(DATA.tables.map(table => [table.name, table]));
const el = (tag, content, parent = panel) => {
  const node = document.createElement(tag);
  node.textContent = content;
  parent.append(node);
  return node;
};
const flags = (table, column) => [
  table.pk.includes(column.name) && 'PK',
  column.ref && 'FK',
  table.unique.some(key => key.columns.length === 1 && key.columns[0] === column.name) && 'UQ'
].filter(Boolean).join(' ');
const links = name => DATA.relationships.filter(rel => rel.child === name || rel.parent === name);
const groupLabel = group => group.replace(/^\d+-/, '').replaceAll('-', ' / ');
const relationshipLabel = rel => 'references ' + rel.foreign_key.replace(/Id$/, '').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
const svgElement = (tag, attributes, parent, value) => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, attr] of Object.entries(attributes)) node.setAttribute(key, attr);
  if (value) node.textContent = value;
  parent.append(node);
  return node;
};

function diagram(detailed) {
  const toolbar = el('div', '');
  toolbar.className = 'toolbar';
  const info = el('p', 'Select a table to trace its relationships.');
  info.setAttribute('aria-live', 'polite');
  const legend = el('ul', '');
  legend.className = 'legend';
  groups.forEach(group => el('li', groupLabel(group), legend));
  const area = el('div', '');
  area.className = 'diagram';
  const positions = new Map();
  const width = detailed ? 580 : 285;
  const stride = width + 180;
  const row = 24;
  let height = 0;
  DATA.layout.forEach((column, index) => {
    let y = 45;
    column.forEach(name => {
      const table = tables.get(name);
      const h = detailed ? 38 + row * table.columns.length : 86;
      positions.set(name, { x: 50 + stride * index, y, h, index });
      y += h + 55;
    });
    height = Math.max(height, y);
  });
  const totalWidth = stride * DATA.layout.length;
  const svg = svgElement('svg', { viewBox: '0 0 ' + totalWidth + ' ' + height }, area);
  const lineLayer = svgElement('g', {}, svg);
  const tableLayer = svgElement('g', {}, svg);
  const edgeElements = [];
  const boxElements = new Map();
  let selected = '';
  let hovered = '';
  let zoom = 1;
  let manual = false;
  const scale = () => {
    svg.setAttribute('width', totalWidth * zoom);
    svg.setAttribute('height', height * zoom);
  };
  const fit = () => { zoom = Math.max(.12, Math.min(1, area.clientWidth / totalWidth)); scale(); };
  window.onresize = () => { if (!manual) fit(); };
  const checkbox = label => {
    const wrapper = el('label', '', toolbar);
    const input = el('input', '', wrapper);
    input.type = 'checkbox';
    const caption = el('span', label, wrapper);
    return { input, caption };
  };
  const hide = checkbox('Hide user links');
  const labels = checkbox('Show relationship names');
  labels.input.checked = !detailed;
  const buttons = [
    ['−', () => { manual = true; zoom = Math.max(.12, zoom / 1.25); scale(); }],
    ['+', () => { manual = true; zoom = Math.min(2, zoom * 1.25); scale(); }],
    ['Fit', () => { manual = false; fit(); }]
  ];
  buttons.forEach(([name, action]) => el('button', name, toolbar).addEventListener('click', action));
  const offset = (name, rel) => 38 + (links(name).indexOf(rel) + 1) * 43 / (links(name).length + 1);
  function marker(parent, x, y, direction, kind) {
    const near = x + direction * 5;
    const far = x + direction * 16;
    if (kind === 'many') {
      svgElement('path', { class: 'edge', d: 'M ' + near + ' ' + (y-5) + ' L ' + far + ' ' + y + ' L ' + near + ' ' + (y+5) }, parent);
    } else {
      svgElement('path', { class: 'edge', d: 'M ' + near + ' ' + (y-5) + ' V ' + (y+5) }, parent);
    }
    if (kind === 'optional' || kind === 'many') {
      svgElement('circle', { class: 'box', cx: far, cy: y, r: 3 }, parent);
    } else {
      svgElement('path', { class: 'edge', d: 'M ' + far + ' ' + (y-5) + ' V ' + (y+5) }, parent);
    }
  }
  DATA.relationships.forEach(rel => {
    const from = positions.get(rel.child);
    const to = positions.get(rel.parent);
    const same = from.index === to.index;
    const direction = from.x <= to.x ? 1 : -1;
    const x1 = from.x + (direction === 1 ? width : 0);
    const x2 = to.x + (same || direction === -1 ? width : 0);
    const port = (name, column) => 54 + row * tables.get(name).columns.findIndex(item => item.name === column);
    const y1 = from.y + (detailed ? port(rel.child, rel.foreign_key) : offset(rel.child, rel));
    const y2 = to.y + (detailed ? port(rel.parent, rel.parent_key) : offset(rel.parent, rel));
    const bend = Math.min(100, Math.max(44, Math.abs(x2 - x1) / 3));
    const group = svgElement('g', {}, lineLayer);
    svgElement('path', { class: 'edge', d: 'M ' + x1 + ' ' + y1 + ' C ' + (x1 + direction * bend) + ' ' + y1 + ', ' + (x2 + (same ? 1 : -direction) * bend) + ' ' + y2 + ', ' + x2 + ' ' + y2 }, group);
    if (!detailed) {
      marker(group, x1, y1, direction, rel.cardinality.includes('0..1') ? 'optional' : 'many');
      marker(group, x2, y2, same ? 1 : -direction, rel.nullable ? 'optional' : 'one');
    }
    const label = svgElement('text', { class: 'label', x: same ? x1 + 45 : (x1+x2)/2, y: (y1+y2)/2-4, 'text-anchor':'middle' }, group, relationshipLabel(rel));
    edgeElements.push({ rel, group, label });
  });
  function refresh() {
    const active = selected || hovered;
    let hidden = 0;
    edgeElements.forEach(({ rel, group, label }) => {
      const conceal = hide.input.checked && rel.parent === 'Users';
      hidden += Number(conceal);
      group.toggleAttribute('hidden', conceal);
      label.toggleAttribute('hidden', !labels.input.checked);
      group.classList.toggle('dim', Boolean(active) && ![rel.child, rel.parent].includes(active));
    });
    hide.caption.textContent = ' Hide user links (' + hidden + ' hidden / ' + edgeElements.length + ')';
    const connected = new Set(links(active).flatMap(rel => [rel.child, rel.parent]));
    boxElements.forEach((node, name) => node.classList.toggle('dim', Boolean(active) && name !== active && !connected.has(name)));
    const related = (key, other) => [...new Set(links(active).filter(rel => rel[key] === active).map(rel => rel[other]))].join(', ') || '—';
    info.textContent = active ? active + ' · Points to ' + related('child', 'parent') + ' · Referenced by ' + related('parent', 'child') : 'Select a table to trace its relationships.';
  }
  DATA.tables.forEach(table => {
    const { x, y, h } = positions.get(table.name);
    const box = svgElement('g', { transform: 'translate(' + x + ' ' + y + ')', tabindex: 0, role:'button', 'aria-label':table.name }, tableLayer);
    boxElements.set(table.name, box);
    svgElement('rect', { class:'box', width, height:h, rx:7 }, box);
    svgElement('rect', { width, height:32, rx:7, fill:colors[groups.indexOf(table.group)] }, box);
    svgElement('text', { class:'title', x:12, y:22 }, box, table.name);
    if (detailed) {
      table.columns.forEach((column, index) => {
        const baseline = 58 + row * index;
        svgElement('text', { x:12, y:baseline }, box, flags(table,column));
        svgElement('text', { x:92, y:baseline }, box, column.name);
        svgElement('text', { x:width-12, y:baseline, 'text-anchor':'end' }, box, column.type);
      });
    } else {
      svgElement('text', { x:12, y:54 }, box, table.columns.length + ' columns');
      svgElement('text', { x:12, y:75 }, box, 'PK ' + table.pk.join(', '));
    }
    box.addEventListener('pointerenter', () => { hovered = table.name; refresh(); });
    box.addEventListener('pointerleave', () => { hovered = ''; refresh(); });
    const select = () => { selected = selected === table.name ? '' : table.name; hovered = ''; refresh(); };
    box.addEventListener('click', select);
    box.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(); }
    });
  });
  svg.addEventListener('click', event => { if (!event.target.closest('[role=button]')) { selected = ''; hovered = ''; refresh(); } });
  [hide.input, labels.input].forEach(input => input.addEventListener('change', refresh));
  refresh();
  fit();
}

function tableCards() {
  groups.forEach(group => {
    el('h2', groupLabel(group));
    DATA.tables.filter(table => table.group === group).forEach(table => {
      const card = el('article', '');
      card.id = table.name;
      el('h3', table.name, card);
      el('p', table.description, card);
      const grid = el('table', '', card);
      const header = el('tr', '', el('thead','',grid));
      ['Column','Type','Keys','Nullable'].forEach(value => el('th',value,header));
      const body = el('tbody','',grid);
      table.columns.forEach(column => {
        const tr = el('tr','',body);
        [column.name,column.type,flags(table,column),column.nullable ? 'Yes' : 'No'].forEach(value => el('td',value,tr));
      });
      for (const [label,key,other] of [['Points to','child','parent'],['Referenced by','parent','child']]) {
        const line = el('p', label + ' · ', card);
        [...new Set(links(table.name).filter(rel => rel[key] === table.name).map(rel => rel[other]))].forEach(name => {
          el('a',name,line).href = '#' + name;
          line.append('  ');
        });
      }
    });
  });
}

function buildSQL(data) {
 const tables = data.tables.map(table => {
  const lines = table.columns.map(column => {
   const relation = data.relationships.find(link => link.child === table.name && link.foreign_key === column.name);
   const pk = table.pk.length === 1 && table.pk[0] === column.name;
   return column.name + ' ' + column.type.toUpperCase() + (column.identity ? ' IDENTITY(1,1)' : '') +
    (pk ? ' PRIMARY KEY' : column.nullable ? ' NULL' : ' NOT NULL') +
    (column.defaultValue !== undefined ? ' DEFAULT ' + column.defaultValue : '') +
    (relation ? ' FOREIGN KEY REFERENCES ' + relation.parent + '(' + relation.parent_key + ')' : '');
  });
  if (table.pk.length > 1) lines.push('PRIMARY KEY (' + table.pk.join(', ') + ')');
  table.unique.forEach(key => lines.push('UNIQUE (' + key.columns.join(', ') + ')'));
  table.checks.forEach(check => lines.push('CHECK (' + check + ')'));
  return 'CREATE TABLE ' + table.name + ' (\n    ' + lines.join(',\n    ') + '\n);';
 });
 const indexes = data.indexes.map(index => 'CREATE INDEX IX_' + index.table + '_' + index.column + ' ON ' + index.table + '(' + index.column + ');');
 return [...tables, ...indexes].join('\n\n') + '\n';
}

function sql() {
  const schemaSql = buildSQL(DATA);
  const toolbar = el('div','');
  toolbar.className = 'toolbar';
  const copy = el('button','Copy SQL',toolbar);
  const download = el('button','Download SQL',toolbar);
  const status = el('p','Run this schema in a new, empty database selected in SSMS.');
  const pre = el('pre',schemaSql);
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(schemaSql); status.textContent = 'SQL copied.'; }
    catch {
      const range = document.createRange();
      range.selectNodeContents(pre);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = document.execCommand('copy') ? 'SQL copied.' : 'SQL selected. Press Ctrl+C.';
    }
  });
  download.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([schemaSql],{type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'HobbyHub-Schema.sql';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}

function rules() {
  el('h2','Database guarantees');
  el('p','Each table has a primary key. Foreign keys require an existing related record. Unique keys prevent duplicate pairs such as a user saving the same hobby twice.');
  el('p','A booking can have multiple payment attempts. The backend verifies a successful payment before confirming a booking, invoice or payout.');
  el('p','The backend checks available seats during booking, verifies real payments and decides when an activity can be published.');
  const status = el('table','');
  const header = el('tr','',el('thead','',status));
  ['Stored status','What the user sees'].forEach(value => el('th',value,header));
  const body = el('tbody','',status);
  [['PendingPayment','Awaiting payment'],['Confirmed','Booking confirmed'],['Expired','Seat hold expired'],['PaymentFailed','Payment failed']].forEach(entry => {
    const row = el('tr','',body);
    entry.forEach(value => el('td',value,row));
  });
  DATA.tables.filter(table => table.checks.length).forEach(table => {
    const card = el('details','');
    el('summary',table.name,card);
    table.checks.forEach(check => el('code',check,el('p','',card)));
  });
}

function activate(index, focus = false) {
  window.onresize = null;
  panel.replaceChildren();
  [...tabs.children].forEach((tab, position) => {
    tab.setAttribute('aria-selected', String(position === index));
    tab.tabIndex = position === index ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby','tab-' + index);
  [() => diagram(false), () => diagram(true), tableCards, sql, rules][index]();
  if (focus) tabs.children[index].focus();
}
names.forEach((name,index) => {
  const tab = el('button',name,tabs);
  tab.id = 'tab-' + index;
  tab.setAttribute('role','tab');
  tab.setAttribute('aria-controls','panel');
  tab.addEventListener('click',() => activate(index));
  tab.addEventListener('keydown', event => {
    const next = { ArrowLeft:(index+4)%5, ArrowRight:(index+1)%5, Home:0, End:4 }[event.key];
    if (next !== undefined) { event.preventDefault(); activate(next,true); }
  });
});
activate(0);

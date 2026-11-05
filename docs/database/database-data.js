const DATA = {
  "version": "relational-review-1",
  "status": "Coursework evaluation",
  "date": "2026-11-05",
  "projectTables": 28,
  "identityTables": 0,
  "tables": [
    {
      "name": "Users",
      "group": "01-Identity",
      "description": "حساب عضو أو أدمن. لكل حساب دور واحد في نسخة التسليم.",
      "pk": [
        "UserId"
      ],
      "unique": [
        {
          "columns": [
            "Email"
          ]
        }
      ],
      "checks": [
        "Role IN ('User', 'Admin')",
        "AccountStatus IN ('Active', 'Suspended', 'PendingActivation')"
      ],
      "columns": [
        {
          "name": "UserId",
          "type": "int",
          "nullable": false,
          "identity": true,
          "ref": null
        },
        {
          "name": "FullName",
          "type": "nvarchar(120)",
          "nullable": false,
          "identity": false,
          "ref": null
        },
        {
          "name": "Email",
          "type": "nvarchar(256)",
          "nullable": false,
          "identity": false,
          "ref": null
        },
        {
          "name": "PasswordHash",
          "type": "nvarchar(256)",
          "nullable": true,
          "identity": false,
          "ref": null
        },
        {
          "name": "Role",
          "type": "varchar(10)",
          "nullable": false,
          "identity": false,
          "ref": null
        },
        {
          "name": "AccountStatus",
          "type": "varchar(24)",
          "nullable": false,
          "identity": false,
          "ref": null
        },
        {
          "name": "ProfileImage",
          "type": "nvarchar(512)",
          "nullable": true,
          "identity": false,
          "ref": null
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "identity": false,
          "ref": null,
          "defaultValue": "GETUTCDATE()"
        }
      ]
    },
    {
      "name": "Categories",
      "group": "02-Catalog-Discovery",
      "description": "التصنيفات المعتمدة وإضافات الأدمن.",
      "columns": [
        {
          "name": "CategoryId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "Slug",
          "type": "nvarchar(80)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Name",
          "type": "nvarchar(100)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IconKey",
          "type": "nvarchar(100)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "TintColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SortOrder",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsActive",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "CategoryId"
      ],
      "unique": [
        {
          "columns": [
            "Slug"
          ],
          "filter": null
        },
        {
          "columns": [
            "Name"
          ],
          "filter": null
        }
      ],
      "checks": [
        "SortOrder >= 0"
      ],
      "framework": false
    },
    {
      "name": "Hobbies",
      "group": "02-Catalog-Discovery",
      "description": "الهواية وخصائص التوصية؛ التصنيف لا يكرر داخل الأنشطة.",
      "columns": [
        {
          "name": "HobbyId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "CategoryId",
          "type": "int",
          "nullable": false,
          "ref": "Categories.CategoryId",
          "identity": false
        },
        {
          "name": "Slug",
          "type": "nvarchar(80)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Name",
          "type": "nvarchar(100)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Definition",
          "type": "nvarchar(2000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "StarterStep",
          "type": "nvarchar(2000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "RequiredToolsAndAccess",
          "type": "nvarchar(2000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IconKey",
          "type": "nvarchar(100)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "HomeStartPossible",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SharedPractice",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CompetitiveGame",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ExtendedFirstExperience",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SupportsRegularPractice",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SupportsOccasionalPractice",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SupportsOutingPractice",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsActive",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "HobbyId"
      ],
      "unique": [
        {
          "columns": [
            "Slug"
          ],
          "filter": null
        }
      ],
      "checks": [],
      "framework": false
    },
    {
      "name": "SavedHobbies",
      "group": "02-Catalog-Discovery",
      "description": "الحفظ والظهور في البروفايل.",
      "columns": [
        {
          "name": "UserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "HobbyId",
          "type": "int",
          "nullable": false,
          "ref": "Hobbies.HobbyId",
          "identity": false
        },
        {
          "name": "SavedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "UserId",
        "HobbyId"
      ],
      "unique": [],
      "checks": [],
      "framework": false
    },
    {
      "name": "DiscoveryQuestions",
      "group": "02-Catalog-Discovery",
      "description": "الـ17 عبارة اهتمام و6 أسئلة سياق؛ قابلة للتحرير.",
      "columns": [
        {
          "name": "QuestionId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "QuestionCode",
          "type": "varchar(40)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Prompt",
          "type": "nvarchar(1000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "QuestionType",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "QuestionRole",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsRequired",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SortOrder",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsActive",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "QuestionId"
      ],
      "unique": [
        {
          "columns": [
            "QuestionCode"
          ],
          "filter": null
        }
      ],
      "checks": [
        "QuestionType IN ('Rating','Single','Multi')",
        "QuestionRole IN ('Interest','Context')",
        "SortOrder >= 0"
      ],
      "framework": false
    },
    {
      "name": "DiscoveryOptions",
      "group": "02-Catalog-Discovery",
      "description": "خيارات السؤال ومعنى Unknown.",
      "columns": [
        {
          "name": "OptionId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "QuestionId",
          "type": "int",
          "nullable": false,
          "ref": "DiscoveryQuestions.QuestionId",
          "identity": false
        },
        {
          "name": "OptionCode",
          "type": "varchar(40)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Label",
          "type": "nvarchar(300)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Score",
          "type": "tinyint",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsUnknown",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsExclusive",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SortOrder",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "OptionId"
      ],
      "unique": [
        {
          "columns": [
            "QuestionId",
            "OptionCode"
          ],
          "filter": null
        }
      ],
      "checks": [
        "SortOrder >= 0"
      ],
      "framework": false
    },
    {
      "name": "DiscoveryInterestLinks",
      "group": "02-Catalog-Discovery",
      "description": "سؤال أساسي وأسئلة مساندة للهواية.",
      "columns": [
        {
          "name": "HobbyId",
          "type": "int",
          "nullable": false,
          "ref": "Hobbies.HobbyId",
          "identity": false
        },
        {
          "name": "QuestionId",
          "type": "int",
          "nullable": false,
          "ref": "DiscoveryQuestions.QuestionId",
          "identity": false
        },
        {
          "name": "LinkRole",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "HobbyId",
        "QuestionId"
      ],
      "unique": [],
      "checks": [
        "LinkRole IN ('Primary','Support')"
      ],
      "framework": false
    },
    {
      "name": "Communities",
      "group": "03-Communities",
      "description": "مجتمع واحد نشط للهواية وفق مسار الموقع الحالي.",
      "columns": [
        {
          "name": "CommunityId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "HobbyId",
          "type": "int",
          "nullable": false,
          "ref": "Hobbies.HobbyId",
          "identity": false
        },
        {
          "name": "Name",
          "type": "nvarchar(150)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Description",
          "type": "nvarchar(2000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "CommunityId"
      ],
      "unique": [],
      "checks": [
        "Status IN ('Active','Archived')"
      ],
      "framework": false
    },
    {
      "name": "CommunityMemberships",
      "group": "03-Communities",
      "description": "انضمام ومغادرة المجتمع.",
      "columns": [
        {
          "name": "UserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "CommunityId",
          "type": "int",
          "nullable": false,
          "ref": "Communities.CommunityId",
          "identity": false
        },
        {
          "name": "JoinedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "UserId",
        "CommunityId"
      ],
      "unique": [],
      "checks": [],
      "framework": false
    },
    {
      "name": "CommunityPosts",
      "group": "03-Communities",
      "description": "بوست العضو ومراجعة الأدمن.",
      "columns": [
        {
          "name": "PostId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "CommunityId",
          "type": "int",
          "nullable": false,
          "ref": "Communities.CommunityId",
          "identity": false
        },
        {
          "name": "AuthorUserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "Body",
          "type": "nvarchar(4000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        },
        {
          "name": "UpdatedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "PostId"
      ],
      "unique": [],
      "checks": [
        "Status IN ('Visible','Hidden')"
      ],
      "framework": false
    },
    {
      "name": "PostReactions",
      "group": "03-Communities",
      "description": "Helpful مرة واحدة لكل شخص على البوست.",
      "columns": [
        {
          "name": "PostId",
          "type": "int",
          "nullable": false,
          "ref": "CommunityPosts.PostId",
          "identity": false
        },
        {
          "name": "UserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "PostId",
        "UserId"
      ],
      "unique": [],
      "checks": [],
      "framework": false
    },
    {
      "name": "IdeaTemplates",
      "group": "04-Journey-Generator",
      "description": "قوالب الأفكار القابلة للتحرير بالأدمن.",
      "columns": [
        {
          "name": "TemplateId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "HobbyId",
          "type": "int",
          "nullable": true,
          "ref": "Hobbies.HobbyId",
          "identity": false
        },
        {
          "name": "Title",
          "type": "nvarchar(200)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Description",
          "type": "nvarchar(2000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ExperienceLevel",
          "type": "varchar(20)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "SuggestedMinutes",
          "type": "smallint",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "PlaceText",
          "type": "nvarchar(300)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsActive",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "TemplateId"
      ],
      "unique": [],
      "checks": [],
      "framework": false
    },
    {
      "name": "IdeaTemplateSteps",
      "group": "04-Journey-Generator",
      "description": "خطوات القالب المتعددة.",
      "columns": [
        {
          "name": "TemplateStepId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "TemplateId",
          "type": "int",
          "nullable": false,
          "ref": "IdeaTemplates.TemplateId",
          "identity": false
        },
        {
          "name": "Title",
          "type": "nvarchar(250)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Description",
          "type": "nvarchar(2000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SortOrder",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "TemplateStepId"
      ],
      "unique": [
        {
          "columns": [
            "TemplateId",
            "SortOrder"
          ],
          "filter": null
        }
      ],
      "checks": [
        "SortOrder >= 0"
      ],
      "framework": false
    },
    {
      "name": "Goals",
      "group": "04-Journey-Generator",
      "description": "الهدف اليدوي أو المحفوظ من المولّد.",
      "columns": [
        {
          "name": "GoalId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "UserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "HobbyId",
          "type": "int",
          "nullable": false,
          "ref": "Hobbies.HobbyId",
          "identity": false
        },
        {
          "name": "Title",
          "type": "nvarchar(200)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Description",
          "type": "nvarchar(2000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "PlannedSessionMinutes",
          "type": "smallint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Source",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SourceTemplateId",
          "type": "int",
          "nullable": true,
          "ref": "IdeaTemplates.TemplateId",
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "GoalId"
      ],
      "unique": [],
      "checks": [
        "Source IN ('Manual','Generator')"
      ],
      "framework": false
    },
    {
      "name": "GoalMilestones",
      "group": "04-Journey-Generator",
      "description": "خطوات الهدف وعلامات الإنجاز.",
      "columns": [
        {
          "name": "MilestoneId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "GoalId",
          "type": "int",
          "nullable": false,
          "ref": "Goals.GoalId",
          "identity": false
        },
        {
          "name": "Title",
          "type": "nvarchar(250)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Description",
          "type": "nvarchar(2000)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "SortOrder",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsCompleted",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CompletedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "MilestoneId"
      ],
      "unique": [
        {
          "columns": [
            "GoalId",
            "SortOrder"
          ],
          "filter": null
        }
      ],
      "checks": [
        "SortOrder >= 0"
      ],
      "framework": false
    },
    {
      "name": "GoalNotes",
      "group": "04-Journey-Generator",
      "description": "ملاحظات صاحب الهدف.",
      "columns": [
        {
          "name": "NoteId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "GoalId",
          "type": "int",
          "nullable": false,
          "ref": "Goals.GoalId",
          "identity": false
        },
        {
          "name": "Body",
          "type": "nvarchar(4000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "NoteId"
      ],
      "unique": [],
      "checks": [],
      "framework": false
    },
    {
      "name": "PracticeSessions",
      "group": "04-Journey-Generator",
      "description": "جلسة تدريب فعلية؛ لا سجل لكل ثانية.",
      "columns": [
        {
          "name": "SessionId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "GoalId",
          "type": "int",
          "nullable": false,
          "ref": "Goals.GoalId",
          "identity": false
        },
        {
          "name": "PlannedMinutes",
          "type": "smallint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "AccumulatedActiveSeconds",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "State",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "StartedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        },
        {
          "name": "LastResumedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "EndedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "SessionId"
      ],
      "unique": [],
      "checks": [
        "State IN ('Running','Paused','Expired','Ended')"
      ],
      "framework": false
    },
    {
      "name": "Organizers",
      "group": "05-Organizers-Activities",
      "description": "جهة خارجية بدون حساب دخول.",
      "columns": [
        {
          "name": "OrganizerId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "BusinessName",
          "type": "nvarchar(150)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ContactName",
          "type": "nvarchar(120)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "Email",
          "type": "nvarchar(256)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Phone",
          "type": "varchar(20)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "PreferredContact",
          "type": "varchar(12)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Notes",
          "type": "nvarchar(2000)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsActive",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "OrganizerId"
      ],
      "unique": [],
      "checks": [
        "PreferredContact IN ('Email','WhatsApp','Phone')"
      ],
      "framework": false
    },
    {
      "name": "Activities",
      "group": "05-Organizers-Activities",
      "description": "النشاط؛ Draft من نموذج الجهة لا يظهر للطلاب.",
      "columns": [
        {
          "name": "ActivityId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "OrganizerId",
          "type": "int",
          "nullable": true,
          "ref": "Organizers.OrganizerId",
          "identity": false
        },
        {
          "name": "HobbyId",
          "type": "int",
          "nullable": false,
          "ref": "Hobbies.HobbyId",
          "identity": false
        },
        {
          "name": "Title",
          "type": "nvarchar(150)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Description",
          "type": "nvarchar(4000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "LearningOutcomes",
          "type": "nvarchar(4000)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "Level",
          "type": "varchar(20)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ActivityType",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Capacity",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "TicketPriceFils",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CommissionPercent",
          "type": "decimal(5,2)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Delivery",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "VenueAddress",
          "type": "nvarchar(1000)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ZoomLink",
          "type": "nvarchar(500)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ZoomMeetingId",
          "type": "varchar(11)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ZoomPasscode",
          "type": "nvarchar(120)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "CoverImage",
          "type": "nvarchar(512)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "PublishAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "BookingClosesAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsHomepageFeatured",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CreatedByUserId",
          "type": "int",
          "nullable": true,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        },
        {
          "name": "PublishedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "ActivityId"
      ],
      "unique": [],
      "checks": [
        "Level IN ('Beginner','Intermediate','Advanced','AllLevels')",
        "ActivityType IN ('Class','Event','Training')",
        "Delivery IN ('InPerson','Online')",
        "Status IN ('Draft','Published','Archived')",
        "TicketPriceFils >= 0",
        "PublishAt < BookingClosesAt",
        "Capacity > 0"
      ],
      "framework": false
    },
    {
      "name": "ActivitySessions",
      "group": "05-Organizers-Activities",
      "description": "كل جلسة تاريخ وبداية ونهاية؛ تولّد من أيام الفورم.",
      "columns": [
        {
          "name": "ActivitySessionId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "ActivityId",
          "type": "int",
          "nullable": false,
          "ref": "Activities.ActivityId",
          "identity": false
        },
        {
          "name": "StartsAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "EndsAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "ActivitySessionId"
      ],
      "unique": [
        {
          "columns": [
            "ActivityId",
            "StartsAt"
          ],
          "filter": null
        }
      ],
      "checks": [
        "StartsAt < EndsAt"
      ],
      "framework": false
    },
    {
      "name": "ActivityRequests",
      "group": "05-Organizers-Activities",
      "description": "الطلب العام والاتفاق الحالي ومرجع قرار الجهة.",
      "columns": [
        {
          "name": "RequestId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "ActivityId",
          "type": "int",
          "nullable": false,
          "ref": "Activities.ActivityId",
          "identity": false
        },
        {
          "name": "SubmitterName",
          "type": "nvarchar(120)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubmitterEmail",
          "type": "nvarchar(256)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubmitterPhone",
          "type": "varchar(20)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "BusinessNameSnapshot",
          "type": "nvarchar(150)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "PreferredContact",
          "type": "varchar(12)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Message",
          "type": "nvarchar(2000)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubmittedPayoutHolder",
          "type": "nvarchar(120)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubmittedPayoutMethod",
          "type": "varchar(10)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubmittedPayoutProvider",
          "type": "nvarchar(100)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "PayoutAccountNumber",
          "type": "nvarchar(120)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "AcceptedTermsAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ReviewStatus",
          "type": "varchar(16)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "QuoteCommissionPercent",
          "type": "decimal(5,2)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "QuoteListingChargeFils",
          "type": "bigint",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "QuoteHomepageChargeFils",
          "type": "bigint",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ReplyDecision",
          "type": "varchar(20)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ReplyChannel",
          "type": "varchar(12)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ReplyReference",
          "type": "nvarchar(300)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "RepliedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubmittedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "RequestId"
      ],
      "unique": [
        {
          "columns": [
            "ActivityId"
          ],
          "filter": null
        }
      ],
      "checks": [
        "PreferredContact IN ('Email','WhatsApp','Phone')",
        "ReviewStatus IN ('New','UnderReview','Closed')"
      ],
      "framework": false
    },
    {
      "name": "Enrollments",
      "group": "05-Organizers-Activities",
      "description": "مقعد اليوزر وحالة التسجيل ولقطة المبالغ.",
      "columns": [
        {
          "name": "EnrollmentId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "UserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "ActivityId",
          "type": "int",
          "nullable": false,
          "ref": "Activities.ActivityId",
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(16)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "TicketPriceFilsSnapshot",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CommissionPercentSnapshot",
          "type": "decimal(5,2)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        },
        {
          "name": "HoldExpiresAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ConfirmedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "EnrollmentId"
      ],
      "unique": [
        {
          "columns": [
            "UserId",
            "ActivityId"
          ],
          "filter": null
        }
      ],
      "checks": [
        "Status IN ('PendingPayment','Confirmed','Expired','PaymentFailed')"
      ],
      "framework": false
    },
    {
      "name": "Invoices",
      "group": "06-Finance",
      "description": "فاتورة خدمات الجهة؛ نوعا رسوم محددان ضمن النطاق.",
      "columns": [
        {
          "name": "InvoiceId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "InvoiceNumber",
          "type": "nvarchar(60)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ActivityId",
          "type": "int",
          "nullable": false,
          "ref": "Activities.ActivityId",
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ListingChargeFils",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "HomepageChargeFils",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IssuedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "DueAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "CreatedByUserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        }
      ],
      "pk": [
        "InvoiceId"
      ],
      "unique": [
        {
          "columns": [
            "InvoiceNumber"
          ],
          "filter": null
        },
        {
          "columns": [
            "ActivityId"
          ],
          "filter": null
        }
      ],
      "checks": [
        "Status IN ('Draft','Issued','Paid','Void')"
      ],
      "framework": false
    },
    {
      "name": "OrganizerPayouts",
      "group": "06-Finance",
      "description": "تسوية نهائية واحدة لكل نشاط بعد نهاية آخر جلسة.",
      "columns": [
        {
          "name": "PayoutId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "ActivityId",
          "type": "int",
          "nullable": false,
          "ref": "Activities.ActivityId",
          "identity": false
        },
        {
          "name": "RecipientHolderSnapshot",
          "type": "nvarchar(120)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "RecipientMethodSnapshot",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "RecipientProviderSnapshot",
          "type": "nvarchar(100)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "RecipientAccountNumber",
          "type": "nvarchar(120)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(12)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "AmountFilsSnapshot",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "CreatedByUserId",
          "type": "int",
          "nullable": false,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "CreatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        },
        {
          "name": "PaidAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "Notes",
          "type": "nvarchar(2000)",
          "nullable": true,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "PayoutId"
      ],
      "unique": [
        {
          "columns": [
            "ActivityId"
          ],
          "filter": null
        }
      ],
      "checks": [
        "RecipientMethodSnapshot IN ('Bank','Wallet','CliQ')",
        "Status IN ('Draft','Ready','Processing','Paid','Failed')"
      ],
      "framework": false
    },
    {
      "name": "PaymentTransactions",
      "group": "06-Finance",
      "description": "كل محاولة دفع وارد أو صادر، مع ربط واحد واضح.",
      "columns": [
        {
          "name": "TransactionId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "Purpose",
          "type": "varchar(20)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "EnrollmentId",
          "type": "int",
          "nullable": true,
          "ref": "Enrollments.EnrollmentId",
          "identity": false
        },
        {
          "name": "InvoiceId",
          "type": "int",
          "nullable": true,
          "ref": "Invoices.InvoiceId",
          "identity": false
        },
        {
          "name": "PayoutId",
          "type": "int",
          "nullable": true,
          "ref": "OrganizerPayouts.PayoutId",
          "identity": false
        },
        {
          "name": "Method",
          "type": "varchar(20)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "AmountFils",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(12)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "PaymentRequestKey",
          "type": "varchar(100)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "StartedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        },
        {
          "name": "ConfirmedAt",
          "type": "datetime",
          "nullable": true,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "TransactionId"
      ],
      "unique": [
        {
          "columns": [
            "PaymentRequestKey"
          ],
          "filter": null
        }
      ],
      "checks": [
        "Purpose IN ('EnrollmentPayment','PublicationPayment','OrganizerPayout')",
        "Status IN ('Created','Pending','Succeeded','Failed','Expired','Unknown')",
        "AmountFils > 0",
        "(Purpose = 'EnrollmentPayment' AND EnrollmentId IS NOT NULL AND InvoiceId IS NULL AND PayoutId IS NULL) OR (Purpose = 'PublicationPayment' AND EnrollmentId IS NULL AND InvoiceId IS NOT NULL AND PayoutId IS NULL) OR (Purpose = 'OrganizerPayout' AND EnrollmentId IS NULL AND InvoiceId IS NULL AND PayoutId IS NOT NULL)"
      ],
      "framework": false
    },
    {
      "name": "PlatformSettings",
      "group": "07-Content-Settings",
      "description": "إعدادات المنصة والأسعار الحالية والحساب الافتراضي.",
      "columns": [
        {
          "name": "SettingsId",
          "type": "tinyint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SiteName",
          "type": "nvarchar(100)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Tagline",
          "type": "nvarchar(200)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ContactEmail",
          "type": "nvarchar(256)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ContactPhone",
          "type": "varchar(20)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "WhatsAppNumber",
          "type": "varchar(20)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "PrimaryColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SecondaryColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "BackgroundColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "TextColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SuccessColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "WarningColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "ErrorColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "InfoColor",
          "type": "char(7)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "DefaultCommissionPercent",
          "type": "decimal(5,2)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "FreeListingDailyFils",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "HomepageDailyFils",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "DiscoveryRevision",
          "type": "bigint",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "UpdatedByUserId",
          "type": "int",
          "nullable": true,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "UpdatedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "SettingsId"
      ],
      "unique": [],
      "checks": [],
      "framework": false
    },
    {
      "name": "ContentBlocks",
      "group": "07-Content-Settings",
      "description": "محتوى الموقع وFAQ بنفس هيكل عنوان/نص/صورة/ترتيب.",
      "columns": [
        {
          "name": "ContentBlockId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "BlockKey",
          "type": "nvarchar(100)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "PageKey",
          "type": "nvarchar(60)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "BlockType",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Title",
          "type": "nvarchar(500)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "BodyText",
          "type": "nvarchar(max)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "ImageStorageKey",
          "type": "nvarchar(512)",
          "nullable": true,
          "ref": null,
          "identity": false
        },
        {
          "name": "SortOrder",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "IsActive",
          "type": "bit",
          "nullable": false,
          "ref": null,
          "identity": false
        }
      ],
      "pk": [
        "ContentBlockId"
      ],
      "unique": [
        {
          "columns": [
            "BlockKey"
          ],
          "filter": null
        }
      ],
      "checks": [
        "BlockType IN ('Text','Image','FAQ')"
      ],
      "framework": false
    },
    {
      "name": "ContactMessages",
      "group": "07-Content-Settings",
      "description": "رسالة عامة من زائر أو مستخدم؛ لا نموذج نشاط هنا.",
      "columns": [
        {
          "name": "MessageId",
          "type": "int",
          "nullable": false,
          "ref": null,
          "identity": true
        },
        {
          "name": "UserId",
          "type": "int",
          "nullable": true,
          "ref": "Users.UserId",
          "identity": false
        },
        {
          "name": "SenderName",
          "type": "nvarchar(120)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SenderEmail",
          "type": "nvarchar(256)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubjectOrTopic",
          "type": "nvarchar(150)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Body",
          "type": "nvarchar(4000)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "Status",
          "type": "varchar(10)",
          "nullable": false,
          "ref": null,
          "identity": false
        },
        {
          "name": "SubmittedAt",
          "type": "datetime",
          "nullable": false,
          "ref": null,
          "identity": false,
          "defaultValue": "GETUTCDATE()"
        }
      ],
      "pk": [
        "MessageId"
      ],
      "unique": [],
      "checks": [
        "Status IN ('New','Read','Archived')"
      ],
      "framework": false
    }
  ],
  "relationships": [
    {
      "parent": "Categories",
      "parent_key": "CategoryId",
      "child": "Hobbies",
      "foreign_key": "CategoryId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "SavedHobbies",
      "foreign_key": "UserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Hobbies",
      "parent_key": "HobbyId",
      "child": "SavedHobbies",
      "foreign_key": "HobbyId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "DiscoveryQuestions",
      "parent_key": "QuestionId",
      "child": "DiscoveryOptions",
      "foreign_key": "QuestionId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Hobbies",
      "parent_key": "HobbyId",
      "child": "DiscoveryInterestLinks",
      "foreign_key": "HobbyId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "DiscoveryQuestions",
      "parent_key": "QuestionId",
      "child": "DiscoveryInterestLinks",
      "foreign_key": "QuestionId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Hobbies",
      "parent_key": "HobbyId",
      "child": "Communities",
      "foreign_key": "HobbyId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "CommunityMemberships",
      "foreign_key": "UserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Communities",
      "parent_key": "CommunityId",
      "child": "CommunityMemberships",
      "foreign_key": "CommunityId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Communities",
      "parent_key": "CommunityId",
      "child": "CommunityPosts",
      "foreign_key": "CommunityId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "CommunityPosts",
      "foreign_key": "AuthorUserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "CommunityPosts",
      "parent_key": "PostId",
      "child": "PostReactions",
      "foreign_key": "PostId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "PostReactions",
      "foreign_key": "UserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Hobbies",
      "parent_key": "HobbyId",
      "child": "IdeaTemplates",
      "foreign_key": "HobbyId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "IdeaTemplates",
      "parent_key": "TemplateId",
      "child": "IdeaTemplateSteps",
      "foreign_key": "TemplateId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "Goals",
      "foreign_key": "UserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Hobbies",
      "parent_key": "HobbyId",
      "child": "Goals",
      "foreign_key": "HobbyId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "IdeaTemplates",
      "parent_key": "TemplateId",
      "child": "Goals",
      "foreign_key": "SourceTemplateId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Goals",
      "parent_key": "GoalId",
      "child": "GoalMilestones",
      "foreign_key": "GoalId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Goals",
      "parent_key": "GoalId",
      "child": "GoalNotes",
      "foreign_key": "GoalId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Goals",
      "parent_key": "GoalId",
      "child": "PracticeSessions",
      "foreign_key": "GoalId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Organizers",
      "parent_key": "OrganizerId",
      "child": "Activities",
      "foreign_key": "OrganizerId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Hobbies",
      "parent_key": "HobbyId",
      "child": "Activities",
      "foreign_key": "HobbyId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "Activities",
      "foreign_key": "CreatedByUserId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Activities",
      "parent_key": "ActivityId",
      "child": "ActivitySessions",
      "foreign_key": "ActivityId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Activities",
      "parent_key": "ActivityId",
      "child": "ActivityRequests",
      "foreign_key": "ActivityId",
      "nullable": false,
      "cardinality": "1 : 0..1",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "Enrollments",
      "foreign_key": "UserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Activities",
      "parent_key": "ActivityId",
      "child": "Enrollments",
      "foreign_key": "ActivityId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Activities",
      "parent_key": "ActivityId",
      "child": "Invoices",
      "foreign_key": "ActivityId",
      "nullable": false,
      "cardinality": "1 : 0..1",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "Invoices",
      "foreign_key": "CreatedByUserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Activities",
      "parent_key": "ActivityId",
      "child": "OrganizerPayouts",
      "foreign_key": "ActivityId",
      "nullable": false,
      "cardinality": "1 : 0..1",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "OrganizerPayouts",
      "foreign_key": "CreatedByUserId",
      "nullable": false,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Enrollments",
      "parent_key": "EnrollmentId",
      "child": "PaymentTransactions",
      "foreign_key": "EnrollmentId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Invoices",
      "parent_key": "InvoiceId",
      "child": "PaymentTransactions",
      "foreign_key": "InvoiceId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "OrganizerPayouts",
      "parent_key": "PayoutId",
      "child": "PaymentTransactions",
      "foreign_key": "PayoutId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "PlatformSettings",
      "foreign_key": "UpdatedByUserId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    },
    {
      "parent": "Users",
      "parent_key": "UserId",
      "child": "ContactMessages",
      "foreign_key": "UserId",
      "nullable": true,
      "cardinality": "1 : 0..N",
      "on_delete": "NO ACTION",
      "note": ""
    }
  ],
  "sqlServerVersion": "17.0.1000.7",
  "layout": [
    [
      "Users"
    ],
    [
      "Categories",
      "Hobbies",
      "SavedHobbies",
      "DiscoveryQuestions",
      "DiscoveryOptions",
      "DiscoveryInterestLinks"
    ],
    [
      "Communities",
      "CommunityMemberships",
      "CommunityPosts",
      "PostReactions"
    ],
    [
      "IdeaTemplates",
      "IdeaTemplateSteps",
      "Goals",
      "GoalMilestones",
      "GoalNotes",
      "PracticeSessions"
    ],
    [
      "Organizers",
      "Activities",
      "ActivitySessions",
      "ActivityRequests",
      "Enrollments"
    ],
    [
      "Invoices",
      "OrganizerPayouts",
      "PaymentTransactions"
    ],
    [
      "PlatformSettings",
      "ContentBlocks",
      "ContactMessages"
    ]
  ],
  "indexes": [
    {
      "table": "Activities",
      "column": "HobbyId"
    },
    {
      "table": "Enrollments",
      "column": "ActivityId"
    },
    {
      "table": "CommunityPosts",
      "column": "CommunityId"
    }
  ]
};

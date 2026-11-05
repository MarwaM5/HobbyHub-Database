-- Run once in SSMS to create a new coursework database.
CREATE DATABASE HobbyHub;
GO
USE HobbyHub;
GO

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(120) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    PasswordHash NVARCHAR(256) NULL,
    Role VARCHAR(10) NOT NULL,
    AccountStatus VARCHAR(24) NOT NULL,
    ProfileImage NVARCHAR(512) NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    UNIQUE (Email),
    CHECK (Role IN ('User', 'Admin')),
    CHECK (AccountStatus IN ('Active', 'Suspended', 'PendingActivation'))
);

CREATE TABLE Categories (
    CategoryId INT IDENTITY(1,1) PRIMARY KEY,
    Slug NVARCHAR(80) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    IconKey NVARCHAR(100) NULL,
    TintColor CHAR(7) NOT NULL,
    SortOrder INT NOT NULL,
    IsActive BIT NOT NULL,
    UNIQUE (Slug),
    UNIQUE (Name),
    CHECK (SortOrder >= 0)
);

CREATE TABLE Hobbies (
    HobbyId INT IDENTITY(1,1) PRIMARY KEY,
    CategoryId INT NOT NULL FOREIGN KEY REFERENCES Categories(CategoryId),
    Slug NVARCHAR(80) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Definition NVARCHAR(2000) NOT NULL,
    StarterStep NVARCHAR(2000) NOT NULL,
    RequiredToolsAndAccess NVARCHAR(2000) NOT NULL,
    IconKey NVARCHAR(100) NULL,
    HomeStartPossible BIT NOT NULL,
    SharedPractice BIT NOT NULL,
    CompetitiveGame BIT NOT NULL,
    ExtendedFirstExperience BIT NOT NULL,
    SupportsRegularPractice BIT NOT NULL,
    SupportsOccasionalPractice BIT NOT NULL,
    SupportsOutingPractice BIT NOT NULL,
    IsActive BIT NOT NULL,
    UNIQUE (Slug)
);

CREATE TABLE SavedHobbies (
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    HobbyId INT NOT NULL FOREIGN KEY REFERENCES Hobbies(HobbyId),
    SavedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    PRIMARY KEY (UserId, HobbyId)
);

CREATE TABLE DiscoveryQuestions (
    QuestionId INT IDENTITY(1,1) PRIMARY KEY,
    QuestionCode VARCHAR(40) NOT NULL,
    Prompt NVARCHAR(1000) NOT NULL,
    QuestionType VARCHAR(10) NOT NULL,
    QuestionRole VARCHAR(10) NOT NULL,
    IsRequired BIT NOT NULL,
    SortOrder INT NOT NULL,
    IsActive BIT NOT NULL,
    UNIQUE (QuestionCode),
    CHECK (QuestionType IN ('Rating','Single','Multi')),
    CHECK (QuestionRole IN ('Interest','Context')),
    CHECK (SortOrder >= 0)
);

CREATE TABLE DiscoveryOptions (
    OptionId INT IDENTITY(1,1) PRIMARY KEY,
    QuestionId INT NOT NULL FOREIGN KEY REFERENCES DiscoveryQuestions(QuestionId),
    OptionCode VARCHAR(40) NOT NULL,
    Label NVARCHAR(300) NOT NULL,
    Score TINYINT NULL,
    IsUnknown BIT NOT NULL,
    IsExclusive BIT NOT NULL,
    SortOrder INT NOT NULL,
    UNIQUE (QuestionId, OptionCode),
    CHECK (SortOrder >= 0)
);

CREATE TABLE DiscoveryInterestLinks (
    HobbyId INT NOT NULL FOREIGN KEY REFERENCES Hobbies(HobbyId),
    QuestionId INT NOT NULL FOREIGN KEY REFERENCES DiscoveryQuestions(QuestionId),
    LinkRole VARCHAR(10) NOT NULL,
    PRIMARY KEY (HobbyId, QuestionId),
    CHECK (LinkRole IN ('Primary','Support'))
);

CREATE TABLE Communities (
    CommunityId INT IDENTITY(1,1) PRIMARY KEY,
    HobbyId INT NOT NULL FOREIGN KEY REFERENCES Hobbies(HobbyId),
    Name NVARCHAR(150) NOT NULL,
    Description NVARCHAR(2000) NOT NULL,
    Status VARCHAR(10) NOT NULL,
    CHECK (Status IN ('Active','Archived'))
);

CREATE TABLE CommunityMemberships (
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CommunityId INT NOT NULL FOREIGN KEY REFERENCES Communities(CommunityId),
    JoinedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    PRIMARY KEY (UserId, CommunityId)
);

CREATE TABLE CommunityPosts (
    PostId INT IDENTITY(1,1) PRIMARY KEY,
    CommunityId INT NOT NULL FOREIGN KEY REFERENCES Communities(CommunityId),
    AuthorUserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    Body NVARCHAR(4000) NOT NULL,
    Status VARCHAR(10) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME NULL,
    CHECK (Status IN ('Visible','Hidden'))
);

CREATE TABLE PostReactions (
    PostId INT NOT NULL FOREIGN KEY REFERENCES CommunityPosts(PostId),
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    PRIMARY KEY (PostId, UserId)
);

CREATE TABLE IdeaTemplates (
    TemplateId INT IDENTITY(1,1) PRIMARY KEY,
    HobbyId INT NULL FOREIGN KEY REFERENCES Hobbies(HobbyId),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(2000) NOT NULL,
    ExperienceLevel VARCHAR(20) NULL,
    SuggestedMinutes SMALLINT NULL,
    PlaceText NVARCHAR(300) NULL,
    IsActive BIT NOT NULL
);

CREATE TABLE IdeaTemplateSteps (
    TemplateStepId INT IDENTITY(1,1) PRIMARY KEY,
    TemplateId INT NOT NULL FOREIGN KEY REFERENCES IdeaTemplates(TemplateId),
    Title NVARCHAR(250) NOT NULL,
    Description NVARCHAR(2000) NOT NULL,
    SortOrder INT NOT NULL,
    UNIQUE (TemplateId, SortOrder),
    CHECK (SortOrder >= 0)
);

CREATE TABLE Goals (
    GoalId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    HobbyId INT NOT NULL FOREIGN KEY REFERENCES Hobbies(HobbyId),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(2000) NOT NULL,
    PlannedSessionMinutes SMALLINT NOT NULL,
    Source VARCHAR(10) NOT NULL,
    SourceTemplateId INT NULL FOREIGN KEY REFERENCES IdeaTemplates(TemplateId),
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    CHECK (Source IN ('Manual','Generator'))
);

CREATE TABLE GoalMilestones (
    MilestoneId INT IDENTITY(1,1) PRIMARY KEY,
    GoalId INT NOT NULL FOREIGN KEY REFERENCES Goals(GoalId),
    Title NVARCHAR(250) NOT NULL,
    Description NVARCHAR(2000) NULL,
    SortOrder INT NOT NULL,
    IsCompleted BIT NOT NULL,
    CompletedAt DATETIME NULL,
    UNIQUE (GoalId, SortOrder),
    CHECK (SortOrder >= 0)
);

CREATE TABLE GoalNotes (
    NoteId INT IDENTITY(1,1) PRIMARY KEY,
    GoalId INT NOT NULL FOREIGN KEY REFERENCES Goals(GoalId),
    Body NVARCHAR(4000) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE PracticeSessions (
    SessionId INT IDENTITY(1,1) PRIMARY KEY,
    GoalId INT NOT NULL FOREIGN KEY REFERENCES Goals(GoalId),
    PlannedMinutes SMALLINT NOT NULL,
    AccumulatedActiveSeconds INT NOT NULL,
    State VARCHAR(10) NOT NULL,
    StartedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    LastResumedAt DATETIME NULL,
    EndedAt DATETIME NULL,
    CHECK (State IN ('Running','Paused','Expired','Ended'))
);

CREATE TABLE Organizers (
    OrganizerId INT IDENTITY(1,1) PRIMARY KEY,
    BusinessName NVARCHAR(150) NOT NULL,
    ContactName NVARCHAR(120) NULL,
    Email NVARCHAR(256) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    PreferredContact VARCHAR(12) NOT NULL,
    Notes NVARCHAR(2000) NULL,
    IsActive BIT NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    CHECK (PreferredContact IN ('Email','WhatsApp','Phone'))
);

CREATE TABLE Activities (
    ActivityId INT IDENTITY(1,1) PRIMARY KEY,
    OrganizerId INT NULL FOREIGN KEY REFERENCES Organizers(OrganizerId),
    HobbyId INT NOT NULL FOREIGN KEY REFERENCES Hobbies(HobbyId),
    Title NVARCHAR(150) NOT NULL,
    Description NVARCHAR(4000) NOT NULL,
    LearningOutcomes NVARCHAR(4000) NULL,
    Level VARCHAR(20) NOT NULL,
    ActivityType VARCHAR(10) NOT NULL,
    Capacity INT NOT NULL,
    TicketPriceFils BIGINT NOT NULL,
    CommissionPercent DECIMAL(5,2) NOT NULL,
    Delivery VARCHAR(10) NOT NULL,
    VenueAddress NVARCHAR(1000) NULL,
    ZoomLink NVARCHAR(500) NULL,
    ZoomMeetingId VARCHAR(11) NULL,
    ZoomPasscode NVARCHAR(120) NULL,
    CoverImage NVARCHAR(512) NULL,
    PublishAt DATETIME NOT NULL,
    BookingClosesAt DATETIME NOT NULL,
    IsHomepageFeatured BIT NOT NULL,
    Status VARCHAR(10) NOT NULL,
    CreatedByUserId INT NULL FOREIGN KEY REFERENCES Users(UserId),
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    PublishedAt DATETIME NULL,
    CHECK (Level IN ('Beginner','Intermediate','Advanced','AllLevels')),
    CHECK (ActivityType IN ('Class','Event','Training')),
    CHECK (Delivery IN ('InPerson','Online')),
    CHECK (Status IN ('Draft','Published','Archived')),
    CHECK (TicketPriceFils >= 0),
    CHECK (PublishAt < BookingClosesAt),
    CHECK (Capacity > 0)
);

CREATE TABLE ActivitySessions (
    ActivitySessionId INT IDENTITY(1,1) PRIMARY KEY,
    ActivityId INT NOT NULL FOREIGN KEY REFERENCES Activities(ActivityId),
    StartsAt DATETIME NOT NULL,
    EndsAt DATETIME NOT NULL,
    UNIQUE (ActivityId, StartsAt),
    CHECK (StartsAt < EndsAt)
);

CREATE TABLE ActivityRequests (
    RequestId INT IDENTITY(1,1) PRIMARY KEY,
    ActivityId INT NOT NULL FOREIGN KEY REFERENCES Activities(ActivityId),
    SubmitterName NVARCHAR(120) NOT NULL,
    SubmitterEmail NVARCHAR(256) NOT NULL,
    SubmitterPhone VARCHAR(20) NOT NULL,
    BusinessNameSnapshot NVARCHAR(150) NOT NULL,
    PreferredContact VARCHAR(12) NOT NULL,
    Message NVARCHAR(2000) NULL,
    SubmittedPayoutHolder NVARCHAR(120) NULL,
    SubmittedPayoutMethod VARCHAR(10) NULL,
    SubmittedPayoutProvider NVARCHAR(100) NULL,
    PayoutAccountNumber NVARCHAR(120) NULL,
    AcceptedTermsAt DATETIME NOT NULL,
    ReviewStatus VARCHAR(16) NOT NULL,
    QuoteCommissionPercent DECIMAL(5,2) NULL,
    QuoteListingChargeFils BIGINT NULL,
    QuoteHomepageChargeFils BIGINT NULL,
    ReplyDecision VARCHAR(20) NULL,
    ReplyChannel VARCHAR(12) NULL,
    ReplyReference NVARCHAR(300) NULL,
    RepliedAt DATETIME NULL,
    SubmittedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    UNIQUE (ActivityId),
    CHECK (PreferredContact IN ('Email','WhatsApp','Phone')),
    CHECK (ReviewStatus IN ('New','UnderReview','Closed'))
);

CREATE TABLE Enrollments (
    EnrollmentId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    ActivityId INT NOT NULL FOREIGN KEY REFERENCES Activities(ActivityId),
    Status VARCHAR(16) NOT NULL,
    TicketPriceFilsSnapshot BIGINT NOT NULL,
    CommissionPercentSnapshot DECIMAL(5,2) NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    HoldExpiresAt DATETIME NULL,
    ConfirmedAt DATETIME NULL,
    UNIQUE (UserId, ActivityId),
    CHECK (Status IN ('PendingPayment','Confirmed','Expired','PaymentFailed'))
);

CREATE TABLE Invoices (
    InvoiceId INT IDENTITY(1,1) PRIMARY KEY,
    InvoiceNumber NVARCHAR(60) NOT NULL,
    ActivityId INT NOT NULL FOREIGN KEY REFERENCES Activities(ActivityId),
    Status VARCHAR(10) NOT NULL,
    ListingChargeFils BIGINT NOT NULL,
    HomepageChargeFils BIGINT NOT NULL,
    IssuedAt DATETIME NOT NULL,
    DueAt DATETIME NULL,
    CreatedByUserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    UNIQUE (InvoiceNumber),
    UNIQUE (ActivityId),
    CHECK (Status IN ('Draft','Issued','Paid','Void'))
);

CREATE TABLE OrganizerPayouts (
    PayoutId INT IDENTITY(1,1) PRIMARY KEY,
    ActivityId INT NOT NULL FOREIGN KEY REFERENCES Activities(ActivityId),
    RecipientHolderSnapshot NVARCHAR(120) NOT NULL,
    RecipientMethodSnapshot VARCHAR(10) NOT NULL,
    RecipientProviderSnapshot NVARCHAR(100) NOT NULL,
    RecipientAccountNumber NVARCHAR(120) NOT NULL,
    Status VARCHAR(12) NOT NULL,
    AmountFilsSnapshot BIGINT NOT NULL,
    CreatedByUserId INT NOT NULL FOREIGN KEY REFERENCES Users(UserId),
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    PaidAt DATETIME NULL,
    Notes NVARCHAR(2000) NULL,
    UNIQUE (ActivityId),
    CHECK (RecipientMethodSnapshot IN ('Bank','Wallet','CliQ')),
    CHECK (Status IN ('Draft','Ready','Processing','Paid','Failed'))
);

CREATE TABLE PaymentTransactions (
    TransactionId INT IDENTITY(1,1) PRIMARY KEY,
    Purpose VARCHAR(20) NOT NULL,
    EnrollmentId INT NULL FOREIGN KEY REFERENCES Enrollments(EnrollmentId),
    InvoiceId INT NULL FOREIGN KEY REFERENCES Invoices(InvoiceId),
    PayoutId INT NULL FOREIGN KEY REFERENCES OrganizerPayouts(PayoutId),
    Method VARCHAR(20) NOT NULL,
    AmountFils BIGINT NOT NULL,
    Status VARCHAR(12) NOT NULL,
    PaymentRequestKey VARCHAR(100) NOT NULL,
    StartedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    ConfirmedAt DATETIME NULL,
    UNIQUE (PaymentRequestKey),
    CHECK (Purpose IN ('EnrollmentPayment','PublicationPayment','OrganizerPayout')),
    CHECK (Status IN ('Created','Pending','Succeeded','Failed','Expired','Unknown')),
    CHECK (AmountFils > 0),
    CHECK ((Purpose = 'EnrollmentPayment' AND EnrollmentId IS NOT NULL AND InvoiceId IS NULL AND PayoutId IS NULL) OR (Purpose = 'PublicationPayment' AND EnrollmentId IS NULL AND InvoiceId IS NOT NULL AND PayoutId IS NULL) OR (Purpose = 'OrganizerPayout' AND EnrollmentId IS NULL AND InvoiceId IS NULL AND PayoutId IS NOT NULL))
);

CREATE TABLE PlatformSettings (
    SettingsId TINYINT PRIMARY KEY,
    SiteName NVARCHAR(100) NOT NULL,
    Tagline NVARCHAR(200) NOT NULL,
    ContactEmail NVARCHAR(256) NOT NULL,
    ContactPhone VARCHAR(20) NOT NULL,
    WhatsAppNumber VARCHAR(20) NOT NULL,
    PrimaryColor CHAR(7) NOT NULL,
    SecondaryColor CHAR(7) NOT NULL,
    BackgroundColor CHAR(7) NOT NULL,
    TextColor CHAR(7) NOT NULL,
    SuccessColor CHAR(7) NOT NULL,
    WarningColor CHAR(7) NOT NULL,
    ErrorColor CHAR(7) NOT NULL,
    InfoColor CHAR(7) NOT NULL,
    DefaultCommissionPercent DECIMAL(5,2) NOT NULL,
    FreeListingDailyFils BIGINT NOT NULL,
    HomepageDailyFils BIGINT NOT NULL,
    DiscoveryRevision BIGINT NOT NULL,
    UpdatedByUserId INT NULL FOREIGN KEY REFERENCES Users(UserId),
    UpdatedAt DATETIME NOT NULL DEFAULT GETUTCDATE()
);

CREATE TABLE ContentBlocks (
    ContentBlockId INT IDENTITY(1,1) PRIMARY KEY,
    BlockKey NVARCHAR(100) NOT NULL,
    PageKey NVARCHAR(60) NOT NULL,
    BlockType VARCHAR(10) NOT NULL,
    Title NVARCHAR(500) NULL,
    BodyText NVARCHAR(MAX) NULL,
    ImageStorageKey NVARCHAR(512) NULL,
    SortOrder INT NOT NULL,
    IsActive BIT NOT NULL,
    UNIQUE (BlockKey),
    CHECK (BlockType IN ('Text','Image','FAQ'))
);

CREATE TABLE ContactMessages (
    MessageId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NULL FOREIGN KEY REFERENCES Users(UserId),
    SenderName NVARCHAR(120) NOT NULL,
    SenderEmail NVARCHAR(256) NOT NULL,
    SubjectOrTopic NVARCHAR(150) NOT NULL,
    Body NVARCHAR(4000) NOT NULL,
    Status VARCHAR(10) NOT NULL,
    SubmittedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    CHECK (Status IN ('New','Read','Archived'))
);

CREATE INDEX IX_Activities_HobbyId ON Activities(HobbyId);

CREATE INDEX IX_Enrollments_ActivityId ON Enrollments(ActivityId);

CREATE INDEX IX_CommunityPosts_CommunityId ON CommunityPosts(CommunityId);

GO

-- Project reference data
INSERT INTO PlatformSettings VALUES
    (1, 'HobbyHub', 'Discover - Learn - Connect - Grow', 'albadarnehmarwa@gmail.com', '+962785477413', '+962785477413', '#ED7052', '#F6A15A', '#FFF8F1', '#332E2A', '#7DA477', '#E0A63A', '#C8503E', '#5B8FA8', 15, 1000, 1000, 1, NULL, DEFAULT);

INSERT INTO Categories VALUES
    ('creative', 'Creative', '', '#FBE3DA', 1, 1);

INSERT INTO Hobbies VALUES
    (1, 'drawing', 'Drawing', 'Create images with lines, shapes and shading on paper or another surface.', 'Try sketching an object with a pencil and paper you already have.', 'Pencil and paper for the proposed first try.', '', 1, 0, 0, 0, 1, 1, 0, 1),
    (1, 'calligraphy', 'Calligraphy', 'Explore the shape and arrangement of letters through a chosen lettering or calligraphy style.', 'Try one letter with an introductory demonstration.', 'A writing tool and paper suited to the chosen style.', '', 1, 0, 0, 0, 1, 1, 0, 1);

INSERT INTO DiscoveryQuestions VALUES
    ('I01', 'Draw a picture using lines and shapes.', 'Rating', 'Interest', 1, 1, 1),
    ('I02', 'Build something by hand, working on small details.', 'Rating', 'Interest', 1, 2, 1);

INSERT INTO DiscoveryOptions VALUES
    (1, '0', 'Not interested', 0, 0, 0, 1),
    (1, '2', 'Might enjoy it', 2, 0, 0, 2),
    (1, '4', 'Would like to try it', 4, 0, 0, 3),
    (1, 'unknown', 'Not sure yet', NULL, 1, 0, 4),
    (2, '0', 'Not interested', 0, 0, 0, 1),
    (2, '2', 'Might enjoy it', 2, 0, 0, 2),
    (2, '4', 'Would like to try it', 4, 0, 0, 3),
    (2, 'unknown', 'Not sure yet', NULL, 1, 0, 4);

INSERT INTO DiscoveryInterestLinks VALUES
    (1, 1, 'Primary'),
    (2, 2, 'Primary');

INSERT INTO Communities VALUES
    (1, 'Drawing Community', 'Share, learn and celebrate drawing.', 'Active');

INSERT INTO ContentBlocks VALUES
    ('faq-1', 'home', 'FAQ', 'What is HobbyHub?', 'HobbyHub is a platform for discovering hobbies, joining learning activities, connecting with hobby communities, and tracking personal progress.', NULL, 1, 1);

GO
-- Fictional evaluation data. Run once after the main script.

INSERT INTO Users VALUES
    ('Demo Admin', 'admin@example.test', NULL, 'Admin', 'Active', NULL, DEFAULT),
    ('Lina Demo', 'lina@example.test', NULL, 'User', 'Active', NULL, DEFAULT),
    ('Omar Demo', 'omar@example.test', NULL, 'User', 'Active', NULL, DEFAULT);

INSERT INTO SavedHobbies VALUES
    (2, 1, DEFAULT);

INSERT INTO CommunityMemberships VALUES
    (2, 1, DEFAULT);

INSERT INTO CommunityPosts VALUES
    (1, 2, 'My first sketch was a cup on my desk.', 'Visible', DEFAULT, NULL);

INSERT INTO PostReactions VALUES
    (1, 3, DEFAULT);

INSERT INTO IdeaTemplates VALUES
    (1, 'Sketch a coffee cup', 'Start with simple shapes and add shading.', NULL, NULL, NULL, 1);

INSERT INTO IdeaTemplateSteps VALUES
    (1, 'Draw the outline', 'Sketch the cup using a circle and a curve.', 1),
    (1, 'Add shadows', 'Shade the side away from the light.', 2);

INSERT INTO Goals VALUES
    (2, 1, 'Sketch a coffee cup', 'Finish a first drawing in two steps.', 30, 'Generator', 1, DEFAULT);

INSERT INTO GoalMilestones VALUES
    (1, 'Draw the outline', NULL, 1, 1, NULL),
    (1, 'Add shadows', NULL, 2, 0, NULL);

INSERT INTO GoalNotes VALUES
    (1, 'Try a softer pencil for shading.', DEFAULT);
INSERT INTO PracticeSessions VALUES
    (1, 30, 900, 'Ended', '2026-11-04T15:00:00', NULL, '2026-11-04T15:15:00');

INSERT INTO Organizers VALUES
    ('Demo Art Studio', NULL, 'studio@example.test', '0790000000', 'Email', NULL, 1, DEFAULT);

-- Paid activity with two sessions. The student pays JOD 20.
INSERT INTO Activities VALUES
    (1, 1, 'Sketching Basics', 'Draw everyday objects.', NULL, 'Beginner', 'Class', 12, 20000, 15, 'InPerson', 'Demo Art Studio, Amman', NULL, NULL, NULL, NULL, '2026-10-01', '2026-10-12', 0, 'Published', NULL, DEFAULT, NULL);

-- Free to students, but the organizer pays listing and homepage fees.
INSERT INTO Activities VALUES
    (1, 1, 'Open Sketch Meetup', 'A free community drawing meetup.', NULL, 'AllLevels', 'Event', 10, 0, 0, 'InPerson', 'Demo Art Studio, Amman', NULL, NULL, NULL, NULL, '2026-11-15', '2026-11-18', 1, 'Published', NULL, DEFAULT, NULL);

INSERT INTO ActivitySessions VALUES
    (1, '2026-10-12T15:00:00', '2026-10-12T16:00:00'),
    (1, '2026-10-14T15:00:00', '2026-10-14T16:00:00'),
    (2, '2026-11-18T15:00:00', '2026-11-18T16:00:00');

INSERT INTO ActivityRequests VALUES
    (2, 'Nour Demo', 'studio@example.test', '0790000000', 'Demo Art Studio', 'Email', NULL, NULL, NULL, NULL, NULL, '2026-11-03', 'Closed', NULL, 3000, 3000, 'Accepted', 'Email', 'DEMO-APPROVAL', '2026-11-04', DEFAULT);

INSERT INTO Enrollments VALUES
    (2, 1, 'Confirmed', 20000, 15, DEFAULT, NULL, '2026-10-05'),
    (3, 2, 'Confirmed', 0, 0, DEFAULT, NULL, '2026-11-16');

INSERT INTO Invoices VALUES
    ('DEMO-001', 2, 'Paid', 3000, 3000, '2026-11-04', NULL, 1);

-- JOD 20 less 15 percent leaves JOD 17 for the organizer.
INSERT INTO OrganizerPayouts VALUES
    (1, 'Demo Art Studio', 'Wallet', 'Demo Wallet', 'DEMO-WALLET', 'Paid', 17000, 1, DEFAULT, '2026-10-15', NULL);

INSERT INTO PaymentTransactions VALUES
    ('EnrollmentPayment', 1, NULL, NULL, 'Wallet', 20000, 'Failed', 'DEMO-BOOK-1', '2026-10-05T10:00:00', NULL),
    ('EnrollmentPayment', 1, NULL, NULL, 'Wallet', 20000, 'Succeeded', 'DEMO-BOOK-2', '2026-10-05T10:02:00', '2026-10-05T10:02:00'),
    ('PublicationPayment', NULL, 1, NULL, 'Wallet', 6000, 'Succeeded', 'DEMO-INVOICE-1', '2026-11-04', '2026-11-04'),
    ('OrganizerPayout', NULL, NULL, 1, 'Wallet', 17000, 'Succeeded', 'DEMO-PAYOUT-1', '2026-10-15', '2026-10-15');

INSERT INTO ContactMessages VALUES
    (2, 'Lina Demo', 'lina@example.test', 'Equipment', 'Should I bring a sketchbook?', 'New', DEFAULT);







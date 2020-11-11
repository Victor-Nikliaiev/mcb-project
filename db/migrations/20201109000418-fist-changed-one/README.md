# Migration `20201109000418-fist-changed-one`

This migration has been generated by Victor Nikliaiev at 11/9/2020, 2:04:18 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "handle" TEXT NOT NULL,
    "userId" INTEGER,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "name" TEXT,
    "surname" TEXT,
    "birthDate" DATETIME,
    "bio" TEXT
)

CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" DATETIME,
    "completion" REAL,
    "completed" BOOLEAN,
    "creatorId" INTEGER,

    FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "_userInCharge" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "_userInCharge_AB_unique" ON "_userInCharge"("A", "B")

CREATE INDEX "_userInCharge_B_index" ON "_userInCharge"("B")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201109000418-fist-changed-one
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,76 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+// --------------------------------------
+model Session {
+  id                 Int       @id @default(autoincrement())
+  createdAt          DateTime  @default(now())
+  updatedAt          DateTime  @updatedAt
+  expiresAt          DateTime?
+  handle             String    @unique
+  user               User?     @relation(fields: [userId], references: [id])
+  userId             Int?
+  hashedSessionToken String?
+  antiCSRFToken      String?
+  publicData         String?
+  privateData        String?
+}
+
+model User {
+  id             Int        @id @default(autoincrement())
+  createdAt      DateTime   @default(now())
+  updatedAt      DateTime   @updatedAt
+  sessions       Session[]
+  role           String     @default("user")
+  avatar         String?
+  email          String     @unique
+  hashedPassword String?
+  name           String?
+  surname        String?
+  birthDate      DateTime?
+  bio            String?
+  position       Position[]
+  createdTasks   Task[]     @relation("createdTask")
+  tasksInCharge  Task[]     @relation("userInCharge")
+  // dialogs        Dialog[]
+  // posts            Post[]
+  // news             News[]
+  // propositions     Proposition[]
+  // rate             Rate
+  // salary           Salary
+  // promotion        Promotion
+  // workingTime      WorkingTime
+  // address          Address
+  // requiredSupplies Supply[]
+
+}
+
+model Position {
+  id     Int    @id @default(autoincrement())
+  name   String
+  user   User?  @relation(fields: [userId], references: [id])
+  userId Int?
+}
+
+model Task {
+  id            Int       @id @default(autoincrement())
+  createdAt     DateTime  @default(now())
+  updatedAt     DateTime  @updatedAt
+  title         String
+  description   String
+  deadline      DateTime?
+  completion    Float?
+  completed     Boolean?
+  creator       User?     @relation("createdTask", fields: [creatorId], references: [id])
+  creatorId     Int?
+  usersInCharge User[]    @relation("userInCharge")
+}
```


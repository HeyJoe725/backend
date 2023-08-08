-- CreateTable
CREATE TABLE "KPI" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL DEFAULT 0,
    "vo" JSONB,
    "overStriding" JSONB,
    "cadence" JSONB,

    CONSTRAINT "KPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runner" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "image" TEXT,
    "name" TEXT,
    "password" TEXT,
    "vo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Runner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT DEFAULT '',
    "image" TEXT DEFAULT '',
    "email" TEXT,
    "link" TEXT DEFAULT '',
    "lastSeen" TIME(6),
    "lastSeenDateTime" DATE,
    "role" TEXT,
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Runner_email_key" ON "Runner"("email");

-- AddForeignKey
ALTER TABLE "KPI" ADD CONSTRAINT "KPI_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Runner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

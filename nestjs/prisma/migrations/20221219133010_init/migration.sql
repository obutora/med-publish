-- CreateTable
CREATE TABLE "medicine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "general_name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "isGeneric" BOOLEAN NOT NULL,
    "unit_price" REAL NOT NULL,
    "amount" REAL NOT NULL
);

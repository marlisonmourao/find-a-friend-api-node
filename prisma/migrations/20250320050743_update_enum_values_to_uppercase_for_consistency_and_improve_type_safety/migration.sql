/*
  Warnings:

  - The values [puppy,adult,senior] on the enum `AGE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AGE_new" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');
ALTER TABLE "pets" ALTER COLUMN "age" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "AGE_new" USING ("age"::text::"AGE_new");
ALTER TYPE "AGE" RENAME TO "AGE_old";
ALTER TYPE "AGE_new" RENAME TO "AGE";
DROP TYPE "AGE_old";
ALTER TABLE "pets" ALTER COLUMN "age" SET DEFAULT 'PUPPY';
COMMIT;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "age" SET DEFAULT 'PUPPY';

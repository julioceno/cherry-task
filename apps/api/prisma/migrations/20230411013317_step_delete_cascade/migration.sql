-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_taskId_fkey";

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

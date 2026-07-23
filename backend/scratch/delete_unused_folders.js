import fs from "fs";

const dir1 = "c:/Users/lenovo/Desktop/VastuVidya/frontend/app/(student)/dashboard/continue-learning";
const dir2 = "c:/Users/lenovo/Desktop/VastuVidya/frontend/app/(student)/dashboard/progress";

[dir1, dir2].forEach((dir) => {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log("Deleted:", dir);
    } catch (e) {
      console.error("Failed to delete:", dir, e.message);
    }
  }
});

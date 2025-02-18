import { createServer, Model, Response } from "miragejs";
import { faker } from "@faker-js/faker";

// ✅ Paksa locale ke Bahasa Indonesia
faker.locale = "id";

// 🔥 Daftar kata dalam Bahasa Indonesia untuk judul & deskripsi
const judulTugas = [
  "Belajar React",
  "Membuat Aplikasi",
  "Menyelesaikan Tugas",
  "Membaca Dokumentasi",
  "Menyusun Rencana",
  "Melakukan Riset UX",
  "Membuat Wireframe",
  "Menulis Laporan",
  "Mengembangkan Fitur",
  "Menguji Aplikasi"
];

const deskripsiTugas = [
  "Pelajari dasar-dasar React dengan membuat aplikasi sederhana.",
  "Buat aplikasi web dengan fitur CRUD.",
  "Selesaikan tugas harian tepat waktu.",
  "Baca dokumentasi API untuk memahami endpoint yang tersedia.",
  "Susun rencana kerja untuk proyek aplikasi baru.",
  "Lakukan riset UX untuk meningkatkan pengalaman pengguna.",
  "Buat wireframe untuk desain aplikasi baru.",
  "Tulis laporan kemajuan proyek minggu ini.",
  "Tambahkan fitur baru pada aplikasi yang sedang dikembangkan.",
  "Uji aplikasi sebelum dipublikasikan untuk memastikan tidak ada bug."
];

export function makeServer() {
  createServer({
    models: {
      user: Model,
      task: Model,
    },

    seeds(server) {
      // ✅ Mock Users
      server.create("user", {
        id: "1",
        username: "azka",
        email: "azka@gmail.com",
        password: "123456", // ✅ Fake password for login
      });

      // ✅ Generate Sample Tasks with Bahasa Indonesia
      for (let i = 101; i <= 110; i++) {
        server.create("task", {
          id: `${i}`,
          title: faker.helpers.arrayElement(judulTugas), // 🔥 Pakai judul Indonesia
          description: faker.helpers.arrayElement(deskripsiTugas), // 🔥 Pakai deskripsi Indonesia
          priority: faker.helpers.arrayElement(["Tinggi", "Sedang", "Rendah"]), // 🇮🇩 Bahasa Indonesia
          status: faker.helpers.arrayElement(["Pending", "In Progress", "Completed"]), // 🇮🇩 Bahasa Indonesia
          deadline: faker.date.future().toISOString().split("T")[0],
        });
      }
    },

    routes() {
      this.namespace = "api";
      this.timing = 500; // ✅ Simulate real API delay

      // ✅ GET: Fetch All Tasks (Supports Filtering & Pagination)
      this.get("/tasks", (schema, request) => {
        let { status, priority, page = 1, limit = 5 } = request.queryParams;
        let tasks = schema.all("task").models;

        // Filtering (status & priority)
        if (status) tasks = tasks.filter((task) => task.status === status);
        if (priority) tasks = tasks.filter((task) => task.priority === priority);

        // Pagination
        let start = (page - 1) * limit;
        let end = start + limit;
        let paginatedTasks = tasks.slice(start, end);

        return { tasks: paginatedTasks, total: tasks.length };
      });

      // ✅ GET: Fetch a Task by ID
      this.get("/tasks/:id", (schema, request) => {
        let task = schema.tasks.find(request.params.id);
        return task ? { task } : new Response(404, {}, { error: "Task tidak ditemukan" });
      });

      // ✅ POST: Create a New Task
      this.post("/tasks", (schema, request) => {
        let data = JSON.parse(request.requestBody);
        let newTask = schema.tasks.create({
          ...data,
          id: faker.string.uuid(), // ✅ Fixed: Use faker.string.uuid() instead of faker.datatype.uuid()
          status: "Pending",
        });

        return { task: newTask };
      });

      // ✅ PATCH: Update a Task
      this.patch("/tasks/:id", (schema, request) => {
        let id = request.params.id;
        let data = JSON.parse(request.requestBody);
        let task = schema.tasks.find(id);

        if (!task) return new Response(404, {}, { error: "Task tidak ditemukan" });

        task.update(data);
        return { task };
      });

      // ✅ DELETE: Remove a Task
      this.delete("/tasks/:id", (schema, request) => {
        let task = schema.tasks.find(request.params.id);
        if (!task) return new Response(404, {}, { error: "Task tidak ditemukan" });

        task.destroy();
        return new Response(204);
      });

      // ✅ POST: User Login (Mock Auth)
      this.post("/login", (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody);
        let user = schema.db.users.findBy({ email });

        if (user && user.password === password) {
          return { token: "fake-jwt-token", user };
        }

        return new Response(401, {}, { error: "Email atau password salah" });
      });
    },
  });
}


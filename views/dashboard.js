document.addEventListener("DOMContentLoaded", () => {
    const getAllTasksBtn = document.getElementById("getAllTasks");
    const taskList = document.getElementById("taskList");
    const taskFormContainer = document.getElementById("taskFormContainer");
    const showTaskFormBtn = document.getElementById("showTaskForm");
    const taskForm = document.getElementById("taskForm");
    const categoryFilter = document.getElementById("categoryFilter");

    showTaskFormBtn.addEventListener("click", () => {
        taskFormContainer.classList.toggle("d-none");
    });

    getAllTasksBtn.addEventListener("click", fetchTasks);
    categoryFilter.addEventListener("change", fetchTasks);
//fetch token
    async function fetchTasks() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token tidak ditemukan. Silakan login lagi.");
            window.location.href = "index.html";
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:3000/tasks", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            if (data.tasks && Array.isArray(data.tasks)) {
                renderTasks(data.tasks);
            } else {
                alert("Gagal mengambil tugas.");
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    }
//menampilkan tugas 
    function renderTasks(tasks) {
        taskList.innerHTML = "";
        const selectedCategory = categoryFilter.value.toLowerCase();

        const filteredTasks = tasks.filter(task =>
            selectedCategory === "all" || task.category.toLowerCase() === selectedCategory
        );

        filteredTasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.className = "col-md-4 mb-3";
            taskElement.innerHTML = `
                <div class="card p-3 ${task.status === "Selesai" ? "bg-success text-white" : ""}">
                    <h5>${task.title}</h5>
                    <p><strong>Kategori:</strong> ${task.category}</p>
                    <p><strong>Deadline:</strong> ${task.deadline}</p>
                    <p><strong>Status:</strong> ${task.status}</p>
                    <button class="btn btn-warning mt-2" onclick="openUpdateForm('${task.id}', '${task.title}', '${task.category}', '${task.deadline}', '${task.status}')">Edit</button>
                    <button class="btn btn-danger mt-2" onclick="deleteTask('${task.id}')">Delete</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }
//menambahkan task
    taskForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token tidak ditemukan. Silakan login lagi.");
            window.location.href = "index.html";
            return;
        }

        const taskData = {
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            deadline: document.getElementById("deadline").value,
            status: "Belum Selesai"
        };

        try {
            const response = await fetch("http://127.0.0.1:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                alert("Task berhasil ditambahkan.");
                fetchTasks();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.error("Gagal menambahkan task:", error);
        }
    });

    window.openUpdateForm = (taskId, title, category, deadline, status) => {
        document.getElementById("updateTaskId").value = taskId;
        document.getElementById("updateTitle").value = title;
        document.getElementById("updateCategory").value = category;
        document.getElementById("updateDeadline").value = deadline;
        document.getElementById("updateStatus").value = status;

        const modal = new bootstrap.Modal(document.getElementById("updateTaskModal"));
        modal.show();
    };
//update task
    document.getElementById("updateTaskForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token tidak ditemukan. Silakan login lagi.");
            window.location.href = "index.html";
            return;
        }

        const taskId = document.getElementById("updateTaskId").value;
        const taskData = {
            title: document.getElementById("updateTitle").value,
            category: document.getElementById("updateCategory").value,
            deadline: document.getElementById("updateDeadline").value,
            status: document.getElementById("updateStatus").value
        };

        try {
            const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                alert("Task berhasil diperbarui.");
                fetchTasks();
                const modal = bootstrap.Modal.getInstance(document.getElementById("updateTaskModal"));
                modal.hide();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.error("Gagal memperbarui tugas:", error);
        }
    });
//delete task
    window.deleteTask = async (taskId) => {
        if (!confirm("Apakah Anda yakin ingin menghapus task ini?")) return;
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token tidak ditemukan. Silakan login lagi.");
            window.location.href = "index.html";
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                alert("Task berhasil dihapus");
                fetchTasks();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.error("Gagal menghapus task:", error);
        }
    };

    fetchTasks();
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token"); // Hapus token
        window.location.href = "index.html"; // Redirect ke halaman login
    });
    
});


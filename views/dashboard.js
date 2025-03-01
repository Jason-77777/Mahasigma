document.addEventListener("DOMContentLoaded", async () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const filterCategory = document.getElementById("filterCategory");
    const filterStatus = document.getElementById("filterStatus");

    // FETCH TASKS DARI BACKEND
    async function fetchTasks() {
        try {
            const response = await fetch("http://127.0.0.1:3000/tasks");
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    }

    // RENDER TASK KE DALAM HTML
    function renderTasks(tasks) {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.className = "col-md-4 mb-3";
            taskElement.innerHTML = `
                <div class="card p-3 ${task.status === "Selesai" ? "bg-success text-white" : ""}">
                    <h5>${task.title}</h5>
                    <p><strong>Kategori:</strong> ${task.category}</p>
                    <p><strong>Deadline:</strong> ${task.deadline}</p>
                    <p><strong>Status:</strong> ${task.status}</p>
                    <button class="btn btn-sm btn-secondary" onclick="toggleTaskStatus('${task.id}', '${task.status}')">
                        ${task.status === "Selesai" ? "Tandai Belum Selesai" : "Tandai Selesai"}
                    </button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });

        // UPDATE FILTER KATEGORI DENGAN DATA UNIK
        const categories = [...new Set(tasks.map(task => task.category))];
        filterCategory.innerHTML = `<option value="">Semua</option>`;
        categories.forEach(category => {
            filterCategory.innerHTML += `<option value="${category}">${category}</option>`;
        });
    }

    // FORM SUBMIT: BUAT TASK BARU
    taskForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const newTask = {
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            deadline: document.getElementById("deadline").value,
            status: "Belum Selesai"
        };

        try {
            const response = await fetch("http://127.0.0.1:3000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                fetchTasks();
                taskForm.reset();
            } else {
                alert("Gagal menambahkan task!");
            }
        } catch (error) {
            console.error("Error menambahkan task:", error);
        }
    });

    // TOGGLE STATUS SELESAI/BELUM SELESAI
    async function toggleTaskStatus(taskId, currentStatus) {
        const newStatus = currentStatus === "Selesai" ? "Belum Selesai" : "Selesai";

        try {
            const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchTasks();
            }
        } catch (error) {
            console.error("Gagal mengupdate status task:", error);
        }
    }

    // FILTER TASK BERDASARKAN KATEGORI DAN STATUS
    filterCategory.addEventListener("change", fetchTasks);
    filterStatus.addEventListener("change", fetchTasks);

    // PANGGIL FETCH TASK SAAT PERTAMA KALI LOAD
    fetchTasks();
});

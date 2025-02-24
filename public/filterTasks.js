document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("categoryFilter");
    const taskList = document.getElementById("taskList");

    categoryFilter.addEventListener("change", function () {
        const selectedCategory = categoryFilter.value;
        fetch(`/tasks?category=${selectedCategory}`)
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = ""; // Hapus daftar tugas lama
                data.forEach(task => {
                    const taskItem = document.createElement("li");
                    taskItem.textContent = `${task.title} - ${task.deadline}`;
                    taskList.appendChild(taskItem);
                });
            })
            .catch(error => console.error("Error fetching tasks:", error));
    });
});

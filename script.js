document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const errorMsg = document.getElementById('error-message');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const todoList = document.getElementById('todo-list');
    const totalTasksEl = document.getElementById('total-tasks');
    const completedTasksEl = document.getElementById('completed-tasks');
    const pendingTasksEl = document.getElementById('pending-tasks');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const dateDisplay = document.getElementById('date-display');

    // Display current date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);

    // State
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    // Initialize
    renderTodos();
    updateStats();

    // Event Listeners
    form.addEventListener('submit', addTodo);
    clearCompletedBtn.addEventListener('click', clearCompleted);

    input.addEventListener('input', () => {
        const text = input.value.trim();
        addButton.disabled = text.length === 0;
        if (text.length > 0) {
            errorMsg.textContent = '';
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderTodos();
        });
    });

    function addTodo(e) {
        e.preventDefault();
        
        const text = input.value.trim();
        if (!text) {
            errorMsg.textContent = 'Please enter a task.';
            return;
        }

        const newTodo = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };

        todos.unshift(newTodo); // Add to top
        saveTodos();
        
        input.value = '';
        addButton.disabled = true;
        renderTodos();
    }

    function toggleTodo(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
        renderTodos();
    }

    function deleteTodo(id) {
        // Add a slight delay for animation before actually removing
        const itemEl = document.querySelector(`[data-id="${id}"]`);
        if (itemEl) {
            itemEl.style.opacity = '0';
            itemEl.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                todos = todos.filter(todo => todo.id !== id);
                saveTodos();
                renderTodos();
            }, 200);
        } else {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        }
    }

    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateStats();
    }

    function updateStats() {
        const total = todos.length;
        const completed = todos.filter(todo => todo.completed).length;
        const pending = total - completed;

        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
        pendingTasksEl.textContent = pending;

        // Only show Clear Completed if tasks have been added
        clearCompletedBtn.style.display = total === 0 ? 'none' : 'block';
    }

    function renderTodos() {
        todoList.innerHTML = '';

        let filteredTodos = todos;
        if (currentFilter === 'active') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        if (filteredTodos.length === 0) {
            let msg = 'No tasks yet. Add one above!';
            if (currentFilter === 'active') msg = 'No active tasks.';
            if (currentFilter === 'completed') msg = 'No completed tasks yet.';
            
            const iconSvg = `<svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>`;
            
            todoList.innerHTML = `<li class="empty-state">${iconSvg}<p>${msg}</p></li>`;
            return;
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.setAttribute('data-id', todo.id);

            li.innerHTML = `
                <div class="todo-view">
                    <div class="todo-content">
                        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                        <span class="todo-text">${escapeHTML(todo.text)}</span>
                    </div>
                    <div class="todo-actions">
                        <button class="edit-button" aria-label="Edit task">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button class="delete-button" aria-label="Delete todo">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <input type="text" class="edit-input" aria-hidden="true" tabindex="-1">
            `;

            const contentDiv = li.querySelector('.todo-content');
            const checkbox = li.querySelector('.todo-checkbox');
            const deleteBtn = li.querySelector('.delete-button');
            const editBtn = li.querySelector('.edit-button');
            const editInput = li.querySelector('.edit-input');

            // Toggle completion
            contentDiv.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    toggleTodo(todo.id);
                }
            });

            checkbox.addEventListener('change', () => {
                toggleTodo(todo.id);
            });

            // Delete
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
            });

            // Edit
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                li.classList.add('editing');
                editInput.value = todo.text;
                editInput.removeAttribute('aria-hidden');
                editInput.removeAttribute('tabindex');
                editInput.focus();
                
                // Move cursor to the end
                const val = editInput.value;
                editInput.value = '';
                editInput.value = val;
            });

            // Save or cancel edit
            const finishEdit = (isCancel = false) => {
                if (!li.classList.contains('editing')) return;
                
                const newText = editInput.value.trim();
                if (isCancel || !newText) {
                    // Revert to original
                    li.classList.remove('editing');
                    editInput.setAttribute('aria-hidden', 'true');
                    editInput.setAttribute('tabindex', '-1');
                    // We don't save anything, it will visually revert because of CSS
                    return;
                }

                if (newText !== todo.text) {
                    // Save changes
                    todo.text = newText;
                    saveTodos();
                    renderTodos();
                } else {
                    // No changes
                    li.classList.remove('editing');
                    editInput.setAttribute('aria-hidden', 'true');
                    editInput.setAttribute('tabindex', '-1');
                }
            };

            editInput.addEventListener('blur', () => finishEdit(false));
            
            editInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    finishEdit(false);
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    finishEdit(true);
                    editBtn.focus(); // return focus to edit button after cancel
                }
            });

            todoList.appendChild(li);
        });
    }

    // Helper function to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});

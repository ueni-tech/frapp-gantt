import Gantt from 'frappe-gantt';

// ガントチャートの初期化
var tasks = [
    {
        id: 'Task 1',
        name: 'タスク1',
        start: '2023-01-01',
        end: '2023-01-05',
        // progress: 20,
        user: '西',
        user_id: 1,
        custom_class: 'user1-task' // ユーザー固有のクラス
    },
    {
        id: 'Task 2',
        name: 'タスク2',
        start: '2023-01-01',
        end: '2023-01-05',
        // progress: 20,
        user: '相川',
        user_id: 2,
        custom_class: 'user2-task' // 別のユーザー用のクラス
    },
    {
        id: 'Task 3',
        name: 'タスク3',
        start: '2023-01-01',
        end: '2023-01-05',
        // progress: 20,
        user: '相川',
        user_id: 2,
        custom_class: 'user2-task' // 別のユーザー用のクラス
    },
    {
        id: 'Task 4',
        name: 'タスク4',
        start: '2023-01-01',
        end: '2023-01-05',
        // progress: 20,
        user: '松本',
        user_id: 39,
        custom_class: 'user2-task' // 別のユーザー用のクラス
    },
    // 他のタスク...
];

var gantt = new Gantt("#gantt", tasks);

// タスクをユーザーごとにグループ化する関数
function groupTasksByUser(tasks) {
    return tasks.reduce((groups, task) => {
        const user = task.user;
        if (!groups[user]) {
            groups[user] = [];
        }
        groups[user].push(task);
        return groups;
    }, {});
}

// 左側のタスクリストを生成
function generateTaskList() {
    var taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // リストをクリア

    const groupedTasks = groupTasksByUser(tasks);

    for (const [user, userTasks] of Object.entries(groupedTasks)) {
        // ユーザー名を表示
        var userElement = document.createElement('div');
        userElement.textContent = user;
        userElement.style.padding = '10px';
        userElement.style.fontWeight = 'bold';
        userElement.style.backgroundColor = '#f0f0f0';
        taskList.appendChild(userElement);

        // ユーザーのタスクを表示
        userTasks.forEach(task => {
            var taskElement = document.createElement('div');
            taskElement.textContent = task.name;
            taskElement.style.padding = '10px 10px 10px 20px'; // 左側にインデント
            taskElement.style.borderBottom = '1px solid #ddd';
            taskList.appendChild(taskElement);
        });
    }
}

generateTaskList();

// ユーザーごとに色を割り当てる関数
function assignColorToUser(user_id) {
    const colors = [
        '#7F7F7F', '#7F7F00', '#7F007F', '#007F7F', '#7F3F3F',
        '#3F7F3F', '#3F3F7F', '#7F5F00', '#007F5F', '#5F007F',
        '#7F007F', '#007F7F', '#7F7F3F', '#3F7F7F', '#7F3F7F',
        '#7F7F5F', '#5F7F7F', '#7F5F7F', '#7F7F7F', '#7F7F00',
        '#7F007F', '#007F7F', '#7F3F3F', '#3F7F3F', '#3F3F7F',
        '#7F5F00', '#007F5F', '#5F007F', '#7F007F', '#007F7F',
        '#7F7F3F', '#3F7F7F', '#7F3F7F', '#7F7F5F', '#5F7F7F',
        '#7F5F7F', '#7F7F7F', '#7F7F00', '#7F007F', '#007F7F',
        '#7F3F3F', '#3F7F3F', '#3F3F7F', '#7F5F00', '#007F5F',
        '#5F007F', '#7F007F', '#007F7F', '#7F7F3F', '#3F7F7F'
    ];
    const index = user_id % colors.length; // user_idに基づいて色を選択
    return colors[index];
}

// タスクにカスタムクラスを割り当てる
tasks.forEach(task => {
    task.custom_class = `user-${task.user.replace(/\s+/g, '-').toLowerCase()}-task`;
});

// CSSルールを動的に追加
tasks.forEach(task => {
    const color = assignColorToUser(task.user_id);
    const style = document.createElement('style');
    style.textContent = `.${task.custom_class} .bar { fill: ${color} !important; }`;
    document.head.appendChild(style);
});

// Ganttチャートの初期化
var gantt = new Gantt("#gantt", tasks);

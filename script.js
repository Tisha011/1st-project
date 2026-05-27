/* THEME */
function setTheme(color){
    document.documentElement.style.setProperty('--accent',color);
}

setTheme('#8B4513');

/* NAVIGATION */
const navBtns=document.querySelectorAll('.nav-btn');
const pages=document.querySelectorAll('.page');

navBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        navBtns.forEach(b=>b.classList.remove('active'));
        pages.forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.page).classList.add('active');
    });
});

/* CLOCK */
function updateClock(){
    const now=new Date();
    document.getElementById('clock').innerHTML=now.toLocaleTimeString();
}
setInterval(updateClock,1000);
updateClock();

/* TIMER */
let timer;
let totalSeconds=1500;

function updateTimerDisplay(){
    const mins=Math.floor(totalSeconds/60);
    const secs=totalSeconds%60;
    document.getElementById('timer').innerHTML=`${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

function startTimer(){
    clearInterval(timer);
    timer=setInterval(()=>{
        if(totalSeconds>0){
            totalSeconds--;
            updateTimerDisplay();
        }else{
            clearInterval(timer);
            alert('Focus Session Complete! 🎉');
        }
    },1000);
}

function resetTimer(){
    clearInterval(timer);
    totalSeconds=document.getElementById('minutesInput').value*60;
    updateTimerDisplay();
}

function skipTimer(){
    clearInterval(timer);
    totalSeconds=300;
    updateTimerDisplay();
}
updateTimerDisplay();

/* TASKS */
const taskList=document.getElementById('taskList');
let tasks=JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(){
    taskList.innerHTML='';
    tasks.forEach((task,index)=>{
        const div=document.createElement('div');
        div.className='task-item';
        div.innerHTML=`
            <div class='task-left'>
                <input type='checkbox' ${task.done?'checked':''} onchange='toggleTask(${index})'>
                <span style='text-decoration:${task.done?'line-through':'none'}'>${task.text}</span>
            </div>
            <button class='delete-btn' onclick='deleteTask(${index})'>Delete</button>
        `;
        taskList.appendChild(div);
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function addTask(){
    const input=document.getElementById('taskInput');
    if(input.value.trim()==='') return;
    tasks.push({text:input.value, done:false});
    input.value='';
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    renderTasks();
}

function toggleTask(index){
    tasks[index].done=!tasks[index].done;
    renderTasks();
}
renderTasks();

/* FINANCE */
const icons={Food:'🍔', Travel:'🚇', Books:'📚', Rent:'🏠'};
let budget=Number(localStorage.getItem('budget')) || 1000;
let expenses=JSON.parse(localStorage.getItem('expenses')) || [];

function updateFinance(){
    const spent=expenses.reduce((a,b)=>a+b.amount,0);
    document.getElementById('spent').innerHTML=`$${spent}`;
    document.getElementById('balance').innerHTML=`$${budget-spent}`;
    localStorage.setItem('expenses',JSON.stringify(expenses));
    localStorage.setItem('budget',budget);
}

function addExpense(){
    const title=document.getElementById('expenseTitle').value;
    const amount=Number(document.getElementById('expenseAmount').value);
    const category=document.getElementById('expenseCategory').value;
    if(!title || !amount) return;
    expenses.push({title, amount, category});
    renderExpenses();
    updateFinance();
    document.getElementById('expenseTitle').value='';
    document.getElementById('expenseAmount').value='';
}

function renderExpenses(){
    const expenseList=document.getElementById('expenseList');
    expenseList.innerHTML='';
    expenses.forEach((expense,index)=>{
        const div=document.createElement('div');
        div.className='expense-item';
        div.innerHTML=`
            <div>
                <h3>${icons[expense.category] || '📌'} ${expense.title}</h3>
                <p style='color:var(--muted)'>${expense.category}</p>
            </div>
            <div style='display:flex; align-items:center; gap:14px'>
                <h3 class='red'>-$${expense.amount}</h3>
                <button class='delete-btn' onclick='deleteExpense(${index})'>Delete</button>
            </div>
        `;
        expenseList.appendChild(div);
    });
}

function deleteExpense(index){
    expenses.splice(index,1);
    renderExpenses();
    updateFinance();
}

function updateBudget(){
    const value=Number(document.getElementById('budgetInput').value);
    if(value>0){
        budget=value;
        updateFinance();
    }
}
renderExpenses();
updateFinance();

/* CAMPUS DIRECTORY */
const places=[
    {name:'UIU Central Library', type:'library', desc:'Rich collection of academic books, journals, and a quiet study environment for UIU students.', time:'08:30 AM - 08:00 PM', loc:'UIU Campus, Madani Avenue'},
    {name:'UIU Canteen', type:'cafe', desc:'Main university cafeteria offering a variety of meals, snacks, and beverages for students.', time:'08:00 AM - 06:00 PM', loc:'Ground Floor, UIU'},
    {name:'UIU Medical Center', type:'hospital', desc:'On-campus primary healthcare, first aid, and emergency medical support.', time:'09:00 AM - 05:00 PM', loc:'UIU Campus'},
    {name:'UIU Study Lounge', type:'study', desc:'Comfortable seating areas and quiet zones for group discussions and self-study.', time:'08:00 AM - 09:00 PM', loc:'Various Floors, UIU'},
    {name:'UIU IT & Engineering Labs', type:'study', desc:'State-of-the-art computer and engineering labs for practical sessions and research.', time:'08:30 AM - 05:00 PM', loc:'Academic Building, UIU'},
    {name:'Nearby Cafe / Food Court', type:'cafe', desc:'Popular hangout spots near the campus serving fast food and coffee.', time:'10:00 AM - 10:00 PM', loc:'Madani Avenue, near UIU'}
];

function renderDirectory(items){
    const directory=document.getElementById('directoryList');
    directory.innerHTML='';
    items.forEach(place=>{
        const div=document.createElement('div');
        div.className='directory-item';
        div.innerHTML=`
            <div class="directory-header">
                <div>
                    <h3>${place.name}</h3>
                    <div class="directory-details">📍 ${place.loc} &nbsp;•&nbsp; 🕒 ${place.time}</div>
                </div>
                <span class="directory-badge">${place.type}</span>
            </div>
            <p class="directory-desc">${place.desc}</p>
            <button class='btn' style='padding:10px; font-size:13px; margin-top:5px;' onclick="getDirections('${place.name}')">Get Directions</button>
        `;
        directory.appendChild(div);a
    });
}

function getDirections(name){
    // গুগল ম্যাপস সার্ভারে সঠিকভাবে জায়গা খোঁজার জন্য ডেস্টিনেশন সেট করা হলো
    const dest = encodeURIComponent(name + ', UIU, Dhaka, Bangladesh');

    // ব্রাউজারের লোকেশন পারমিশন চাওয়া হচ্ছে
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // গুগল ম্যাপস এর ডিরেকশন সার্ভারে কানেক্ট করে নতুন ট্যাবে রুট ওপেন করা (দূরত্ব এবং সময়সহ)
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${dest}`, '_blank');
            },
            (error) => {
                console.warn("Location access unavailable. Opening destination directly.");
                window.open(`https://www.google.com/maps/search/?api=1&query=${dest}`, '_blank');
            }
        );
    } else {
        window.open(`https://www.google.com/maps/search/?api=1&query=${dest}`, '_blank');
    }
}

function filterDirectory(type,el){
    document.querySelectorAll('.filter-btn').forEach(btn=>btn.classList.remove('active'));
    el.classList.add('active');
    if(type==='all'){
        renderDirectory(places);
    }else{
        renderDirectory(places.filter(p=>p.type===type));
    }
}

function searchDirectory(){
    const value=document.getElementById('searchInput').value.toLowerCase();
    renderDirectory(places.filter(place=>place.name.toLowerCase().includes(value)));
}
renderDirectory(places);
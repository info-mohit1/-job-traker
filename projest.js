const totalDisplay = document.getElementById('total');
const interviewDisplay = document.getElementById('Interview');
const rejectedDisplay = document.getElementById('Rejected');
const allCardSection = document.getElementById('all-card');
const filterSection = document.getElementById('filtered-section');

let InterviewList = [];
let RejectedList = [];

function updateCounters() {
    totalDisplay.innerText = allCardSection.children.length;
    interviewDisplay.innerText = InterviewList.length;
    rejectedDisplay.innerText = RejectedList.length;
}

function toggleStyle(id) {
    const buttons = ['all-btn', 'Interview-btn', 'Rejected-btn'];
    buttons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('text-[#64748B]', 'border-gray-200');
    });

    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.add('bg-blue-600', 'text-white');
    selectedBtn.classList.remove('text-[#64748B]', 'border-gray-200');

    if (id === 'all-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else if (id === 'Interview-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFilteredData(InterviewList, 'Interview', 'text-green-500');
    } else if (id === 'Rejected-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFilteredData(RejectedList, 'Rejected', 'text-red-500');
    }
}

document.addEventListener('click', function(event) {
    const target = event.target;
    const card = target.closest('.flex.justify-between');
    if (!card) return;

    const jobInfo = {
        id: card.querySelector('.mobile').innerText,
        mobile: card.querySelector('.mobile').innerText,
        react: card.querySelector('.React').innerText,
        build: card.querySelector('.Build').innerText
    };

    if (target.classList.contains('interviewButton')) {
        
        RejectedList = RejectedList.filter(item => item.id !== jobInfo.id);
        
       
        if (!InterviewList.find(item => item.id === jobInfo.id)) {
            InterviewList.push(jobInfo);
        }
        
        updateCounters();
        refreshCurrentTab(); 
    }

    if (target.classList.contains('RejectedButton')) {
       
        InterviewList = InterviewList.filter(item => item.id !== jobInfo.id);
        
        
        if (!RejectedList.find(item => item.id === jobInfo.id)) {
            RejectedList.push(jobInfo);
        }
        
        updateCounters();
        refreshCurrentTab(); 
    }

   
    if (target.closest('.deleteBtn')) {
        if (card.parentElement.id === 'all-card') {
            card.remove();
        }
        InterviewList = InterviewList.filter(item => item.id !== jobInfo.id);
        RejectedList = RejectedList.filter(item => item.id !== jobInfo.id);
        updateCounters();
        refreshCurrentTab();
    }
});

function refreshCurrentTab() {
    if (document.getElementById('Interview-btn').classList.contains('bg-blue-600')) {
        renderFilteredData(InterviewList, 'Interview', 'text-green-500');
    } else if (document.getElementById('Rejected-btn').classList.contains('bg-blue-600')) {
        renderFilteredData(RejectedList, 'Rejected', 'text-red-500');
    }
}

function renderFilteredData(list, statusText, colorClass) {
    filterSection.innerHTML = `<h2 class="text-xl font-bold mb-4">${statusText} Applications</h2>`;
    if (list.length === 0) {
        filterSection.innerHTML += `<p class="text-gray-400">No applications found.</p>`;
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'flex justify-between bg-white shadow-md p-6 rounded-xl border border-gray-100 mb-4 transition-all duration-300 hover:shadow-lg';
        div.innerHTML = `
            <div class="flex-1">
                <h3 class="mobile text-[#002C5C] text-[24px] font-bold">${item.mobile}</h3>
                <p class="React text-[#64748B] font-medium">${item.react}</p>
                <p class="Remote text-[#64748B] mt-2 mb-2 text-sm italic">Remote • Full-time • $130k - $175k</p>
                <p class="${colorClass} mt-3 mb-3 w-fit px-3 py-1 text-xs border-2 border-current rounded font-bold uppercase">${statusText}</p>
                <p class="Build text-sm text-gray-600 mb-6">${item.build}</p>
                <div class="flex gap-2">
                    <button class="interviewButton text-green-500 px-4 py-1.5 text-sm font-bold border-2 border-green-500 rounded-md hover:bg-green-500 hover:text-white transition-all duration-300 uppercase">INTERVIEW</button>
                    <button class="RejectedButton text-red-500 px-4 py-1.5 text-sm font-bold border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 uppercase">REJECTED</button>
                </div>
            </div>
            <button class="deleteBtn self-start w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all duration-300">
                <i class="fa-solid fa-trash-can"></i>
            </button>`;
        filterSection.appendChild(div);
    });
}

updateCounters();
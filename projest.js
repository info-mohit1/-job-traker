 
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
        btn.classList.remove('bg-blue-500', 'text-white', 'border-blue-300');
        btn.classList.add('text-[#64748B]', 'border-gray-200');
    });

    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.add('bg-blue-500', 'text-white', 'border-blue-300');
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

 
document.getElementById('main').addEventListener('click', function(event) {
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
        const exists = InterviewList.find(item => item.id === jobInfo.id);
        if (!exists) {
            InterviewList.push(jobInfo);
            updateCounters();
        }
    }
 
    if (target.classList.contains('RejectedButton')) {
        const exists = RejectedList.find(item => item.id === jobInfo.id);
        if (!exists) {
            RejectedList.push(jobInfo);
            updateCounters();
        }
    }
 
    if (target.closest('.deleteBtn')) {
        card.remove();
        updateCounters();
    }
});

 
function renderFilteredData(list, statusText, colorClass) {
    filterSection.innerHTML = `<h2 class="text-xl font-bold mb-4">${statusText} Applications</h2>`;
    
    if (list.length === 0) {
        filterSection.innerHTML += `<p class="text-gray-400">No jobs found in this category.</p>`;
        return;
    }

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'flex justify-between bg-white shadow-md p-[24px] rounded-lg border border-gray-100 mb-4';
        div.innerHTML = `
            <div>
                <h3 class="text-[#002C5C] text-[22px] font-bold">${item.mobile}</h3>
                <p class="text-[#64748B] font-medium">${item.react}</p>
                <p class="${colorClass} mt-3 mb-3 w-fit px-3 py-1 text-xs border-2 border-current rounded font-bold uppercase">${statusText}</p>
                <p class="text-sm text-gray-600">${item.build}</p>
            </div>
        `;
        filterSection.appendChild(div);
    });
}

 
updateCounters();
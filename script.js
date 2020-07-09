
let store = {
    _state: {
        staff: [
            {
                id: 0,
                name: 'Default',
                position: 'Default',
                statuses: [
                    {id: 1, name: 'Default'},
                ],
                salaries: [
                    {id: 1, date: 'Default', sum: 'Default'},
                ]

            },
        ]
    },
    getData(url) {
        let data = {action: 'GET_WORKERS'};
        let context = this;
        fetch(url, {
            method: 'POST',
            body:JSON.stringify(data),
            headers:{'content-type': 'application/json'}
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            context._state.staff = data;   
            context.setData();             
        })
    },
    getState() {
        return this._state
    },
    init(table = null, addBtn = null) {
       this.wrapper = document.querySelector(table);
    },
    setData() {
        // cleaning table
        this.wrapper.querySelectorAll('[data-table-row]')
            .forEach(function (tableRow) {
                tableRow.remove();
            })

        //table-row cloning
        const el = document.getElementById('table-item');
        let context = this;

        //staff person foreach use
        this._state.staff.map(function (item) {

            let staffRow = el.cloneNode(true);

            staffRow.querySelectorAll('[data-id]')
                .forEach(function (el) {
                    el.setAttribute('data-id', item.id);
                });

            //name and position settings
            staffRow.querySelector('[data-name-field]').value = item.name;
            staffRow.querySelector('[data-position-field]').value = item.position;

            // status-list setting
            const statusListEl = staffRow.querySelector('[data-status-ul]');
            const statusItemInitialEl  = staffRow.querySelector('[data-status-item]');
            item.statuses.map(function (status) {
                const statusItemEl = statusItemInitialEl.cloneNode(true);
                statusItemEl.querySelectorAll('[data-status-id]')
                    .forEach(function (el) {
                        el.setAttribute('data-status-id', status.id)
                    })
                const statusFieldEl = statusItemEl.querySelector('[data-status-field]');
                statusFieldEl.value = status.name;
                statusListEl.append(statusItemEl);
            })
            statusItemInitialEl.remove();

            //salary-list setting
            const salaryListEl = staffRow.querySelector('[data-salary-ul]');
            const salaryItemInitialEl  = staffRow.querySelector('[data-salary-item]');
            item.salaries.map(function (salary) {
                const salaryItemEl = salaryItemInitialEl.cloneNode(true);
                salaryItemEl.querySelectorAll('[data-salary-id]')
                    .forEach(function (el) {
                        el.setAttribute('data-salary-id', salary.id)
                    })
                salaryItemEl.querySelector('[data-salary-date]').value = salary.date;
                salaryItemEl.querySelector('[data-salary-sum]').value = salary.sum;
                salaryListEl.append(salaryItemEl);
            })
            salaryItemInitialEl.remove()

            //add table-row to table
            context.wrapper.append(staffRow);
        })
    },
    send(){
        console.log(this.getState().staff);
    },

    //events methods
    action(action = {type: 'no type'}) {
        let state = this._state;
        switch (action.type) {
            case 'DELETE_PERSON':
                let staff = this._state.staff;
                staff.map(function (person, i) {
                    if (person.id == action.id) {
                        staff.splice(i, 1);
                    }
                })
                break;
            case 'ADD_PERSON':
                let workerId = 0;
                this._state.staff.map(function(worker){
                    if (worker.id > workerId) {
                        workerId = worker.id;
                    }
                })
                this._state.staff.push({
                    id: ++workerId,
                    name: '',
                    position: '',
                    statuses: [],
                    salaries: []
                });
                alert('Строка добавлена');
                break;
            case 'CHANGE_NAME':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        state.staff[i].name = action.el.value;
                    }
                })
                break
            case 'CHANGE_POSITION' :
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        state.staff[i].position = action.el.value;
                    }
                })
                break
            case 'CHANGE_STATUS':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        state.staff[i].statuses.map(function (status, statusIndex) {
                            if (status.id == action.el.getAttribute('data-status-id')) {
                                state.staff[i].statuses[statusIndex].name = action.el.value;
                            }
                        })
                    }
                })
                break
            case 'DELETE_STATUS':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        state.staff[i].statuses.map(function (status, statusIndex) {
                            if (status.id == action.el.getAttribute('data-status-id')) {
                                state.staff[i].statuses.splice(statusIndex, 1);
                            }
                        })
                    }
                })
                break
            case 'ADD_STATUS':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        let statusId = 0;
                        state.staff[i].statuses.map(function (status) {
                            if (status.id > statusId) statusId = status.id
                        })
                        state.staff[i].statuses.push({id: ++statusId, name: ''})
                    }
                })
                break
            case 'CHANGE_SALARY_DATE':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        state.staff[i].salaries.map(function (salary, salaryIndex) {
                            if (salary.id == action.el.getAttribute('data-salary-id')) {
                                state.staff[i].salaries[salaryIndex].date = action.el.value;
                            }
                        })
                    }
                })
                break
            case 'CHANGE_SALARY_SUM':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        state.staff[i].salaries.map(function (salary, salaryIndex) {
                            if (salary.id == action.el.getAttribute('data-salary-id')) {
                                state.staff[i].salaries[salaryIndex].sum = action.el.value;
                            }
                        })
                    }
                })
                break
            case 'DELETE_SALARY':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        state.staff[i].salaries.map(function (salary, salaryIndex) {
                            if (salary.id == action.el.getAttribute('data-salary-id')) {
                                state.staff[i].salaries.splice(salaryIndex, 1)
                            }
                        })
                    }
                })
                break
            case 'ADD_SALARY':
                state.staff.map(function (person, i) {
                    if (person.id == action.el.getAttribute('data-id')) {
                        let salaryId = 0;
                        state.staff[i].salaries.map(function (salary) {
                            if (salary.id > salaryId) salaryId = salary.id
                        })
                        state.staff[i].salaries.push({id: ++salaryId, date: '', sum: ''})
                    }
                })
                break
            default:
                console.log('has no action of type `' + action.type + '`')
        }

        this.setData();
    },



}


console.log(store.getState())

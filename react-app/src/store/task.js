const GET_ALL_TASKS = 'tasks/GET_ALL_TASKS'
const GET_ONE_TASK = 'tasks/GET_ONE_TASK'
const CREATE_TASK = 'tasks/CREATE_TASK'
const EDIT_TASK = 'tasks/EDIT_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'

//action creators 

const getAllTasks = (tasks) => ({
    type: GET_ALL_TASKS,
    payload: tasks
})

const getOneTask = (task) => ({
    type: GET_ONE_TASK,
    payload: task
})

const createTasks = (task) => ({
    type: CREATE_TASK,
    payload: task
})

const editTask = (taskId) => ({
    type: EDIT_TASK,
    payload: taskId
})
export interface Task{
    id?: string;
    assigned_user: string;
    task_date: Date;
    task_time: number;
    time_zone: number;
    is_completed: boolean;
    task_msg: string;
    user_id?: string;
}

export interface User{
    name: string;
    icon: string;
    user_id: string;
}
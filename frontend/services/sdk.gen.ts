// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { AppApiListTasksData, AppApiListTasksResponse, AppApiCreateTaskData, AppApiCreateTaskResponse, AppApiGetTaskData, AppApiGetTaskResponse, AppApiUpdateTaskData, AppApiUpdateTaskResponse, AppApiDeleteTaskData, AppApiDeleteTaskResponse } from './types.gen';

export class DefaultService {
    /**
     * List Tasks
     * @param data The data for the request.
     * @param data.title
     * @returns TaskSchema OK
     * @throws ApiError
     */
    public static appApiListTasks(data: AppApiListTasksData = {}): CancelablePromise<AppApiListTasksResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks',
            query: {
                title: data.title
            }
        });
    }
    
    /**
     * Create Task
     * @param data The data for the request.
     * @param data.requestBody
     * @returns TaskSchema OK
     * @throws ApiError
     */
    public static appApiCreateTask(data: AppApiCreateTaskData): CancelablePromise<AppApiCreateTaskResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                400: 'Bad Request'
            }
        });
    }
    
    /**
     * Get Task
     * @param data The data for the request.
     * @param data.taskId
     * @returns TaskSchema OK
     * @throws ApiError
     */
    public static appApiGetTask(data: AppApiGetTaskData): CancelablePromise<AppApiGetTaskResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks/{task_id}',
            path: {
                task_id: data.taskId
            },
            errors: {
                404: 'Not Found'
            }
        });
    }
    
    /**
     * Update Task
     * @param data The data for the request.
     * @param data.taskId
     * @param data.requestBody
     * @returns CreateTaskSchema OK
     * @throws ApiError
     */
    public static appApiUpdateTask(data: AppApiUpdateTaskData): CancelablePromise<AppApiUpdateTaskResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tasks/{task_id}',
            path: {
                task_id: data.taskId
            },
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                400: 'Bad Request',
                404: 'Not Found'
            }
        });
    }
    
    /**
     * Delete Task
     * @param data The data for the request.
     * @param data.taskId
     * @returns void No Content
     * @throws ApiError
     */
    public static appApiDeleteTask(data: AppApiDeleteTaskData): CancelablePromise<AppApiDeleteTaskResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tasks/{task_id}',
            path: {
                task_id: data.taskId
            },
            errors: {
                404: 'Not Found'
            }
        });
    }
    
}
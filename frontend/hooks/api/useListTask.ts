import { useQuery } from '@tanstack/react-query';
import { DefaultService } from '../../services/sdk.gen';

export const useListTasks = (title: string = '') => {
    return useQuery({
        queryKey: ['tasks', title],
        queryFn: () => DefaultService.appApiListTasks({ title }),
    });
};
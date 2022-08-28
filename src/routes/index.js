import { useRoutes } from 'react-router-dom';
import appRoutes from './paths';

const Router = () => {
    return useRoutes(appRoutes);
}

export default Router;
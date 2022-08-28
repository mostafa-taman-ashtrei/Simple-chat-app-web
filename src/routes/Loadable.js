import { Suspense } from 'react';


const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<></>}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;
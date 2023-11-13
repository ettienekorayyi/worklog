import React, { useState } from 'react';
import JobDiary from '../JobDiary/JobDiary';
import JobDetails from '../JobDetails/JobDetails';
import { FullWidthTabs } from './FullWidthTabs';

export default function ViewJobs(props) {
    const { history } = props;
    const [type, setType] = useState('');
    const [params, setParams] = useState({});
    const [path, setPath] = useState('');

    const callback = (props) => {
        setType(props.componentType);
        setParams(props)
        setPath(props.detailsPath);
    };

    const renderDataTable = () => {
        switch (type) {
            case 'diary':
                return <JobDiary rows={params} onClick={history.push({
                    pathname: "/view/jobs/diary",
                    state: { rows: params }
                })} />
            case 'jobDetails':
                return <JobDetails rows={params} path={path} onClick={history.push({
                    pathname: path,
                })} />
            default:
                return <FullWidthTabs history={history} callback={callback} />
        }
    };

    return (
        <>
            {renderDataTable()}
        </>
    );
}

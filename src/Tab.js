import './Tab.css';
import { useContext } from 'react';
import { Context } from './TaskBoard';

function Tab() {
    const tabList = [{
        id: -1,
        name: "Yesterday's Tasks"
    },
    {
        id: 0,
        name: "Today's Tasks"
    },
    {
        id: 1,
        name: "Tomorrow's Tasks"
    }];
    const current = new Date();
    //const [date, setDate] = useState(current.getTime());
    const {setDate} = useContext(Context);
    function changeDateFunction(tabValue) {
       setDate(a => current.getTime() + tabValue* 1000 * 60 * 60 *24)
    }
    const listItems = tabList.map(tab =>
        <button className="tab-button" key={tab.id} onClick={() => changeDateFunction(tab.id)}>{tab.name}</button>
    );
    return <div>{listItems}</div>;
}

export default Tab;
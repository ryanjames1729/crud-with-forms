import CreateForm from '../components/CreateForm';
import { getNames } from '../actions';

export default function Page() {

    return (
        <div>
            <h1>Read or GET</h1>
            <CreateForm getNames={getNames} />
        </div>
    )
}
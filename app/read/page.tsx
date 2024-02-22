import CreateForm from '../components/CreateForm';

export default function Page(names: any) {

    return (
        <div>
            <h1>Read or GET</h1>
            <CreateForm />
            {names ? names : 0}
        </div>
    )
}   
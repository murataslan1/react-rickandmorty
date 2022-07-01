import {Link} from 'react-router-dom'

export default function NotFound(){
    return <div>
        Not Found 404
        <br />
        <Link to={'/'}>Go to home page</Link>
        </div>
}

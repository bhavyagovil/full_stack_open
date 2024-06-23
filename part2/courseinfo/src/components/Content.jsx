import Part from './Part'

const Content = (props) => {
    return(
    <div>
    {props.content.map(part => <Part key={part.id} part={part}/>)}
    </div>
    )}

export default Content
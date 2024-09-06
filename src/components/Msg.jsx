import style from './Msg.module.css'

export default function Error (props) {
    return (
        <span className={`${style.error} sm:max-w-[500px]`}>{props.children}</span>
    )
}
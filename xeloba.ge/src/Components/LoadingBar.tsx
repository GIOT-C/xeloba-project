import styles from "./Styles/LoadingBar.module.scss";
function LoadingBar(){
    return(
<div className={styles.container}>
    <div className={styles.circle}></div>
</div>
    )
}

export default LoadingBar;
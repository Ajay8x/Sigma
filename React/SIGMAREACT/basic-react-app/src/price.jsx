export default function Price({ oldPrice, newPrice }) {

    let oldStyles = {
        textDecorationLine: "line-through",
    };

    let newStyles = {
        fontWeight: "bold",
    };
    let styles = {
        backgroundColor: "yellow",
        height:"33px",
        borderBottomLeftRadius:"15px",
      borderBottomRightRadius:"15px",
    };


    return (
        <div style={styles}>
            <span style={oldStyles}>{oldPrice}</span>
            &nbsp;    &nbsp;    &nbsp;
            <span style={newStyles}>{newPrice}</span>
        </div>
    );
}

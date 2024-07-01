

export default function Main(props) {
    const { data } = props;

    return (
        <div className="img-container">
            <img className="background-image" src={data?.hdurl ? data.hdurl : "mars.png"} alt={data?.title} />
        </div>
    )

}


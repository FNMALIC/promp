import Feed from "@components/Feed"


const Home = () =>{
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover and Share
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center">
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center">
                lorem test tejasb jand kjnas kjans slak
                n njkn nknj nkg fgj fgjc jtrdrt rt
                <Feed />
            </p>
        </section>
    )
}

export default Home
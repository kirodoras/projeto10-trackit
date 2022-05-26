import { Link } from "react-router-dom";
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

export default function FooterMenu() {
    const percentage = 66;

    return (
        <FooterMenuStyle>
            <div className='footerContent'>
                <Link to='/habitos'>Hábitos</Link>
                <Link to='/hoje'>
                    <Progressbar>
                        <CircularProgressbar
                            value={percentage}
                            text='Hoje'
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#52B6FF",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })} />
                    </Progressbar>
                </Link>
                <Link to='/historico'>Histórico</Link>
            </div>
        </FooterMenuStyle>
    );
}

const FooterMenuStyle = styled.footer`
    display: flex;
    justify-content: center;

    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    max-width: 100%;
    height: 70px;
    padding: 22px 38px 26px 38px;
    
    .footerContent {
        display: flex;
        justify-content: space-between;

        position: relative;

        width: 375px;
        max-width: 100%;
        height: 100%;
    }
    a {
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-decoration: none;
        color: var(--color-blue);
    }
`;

const Progressbar = styled.div`
    width: 91px;
    max-width: 100%;
    height: 91px;
    position: absolute;
    bottom: -15px;
    left: calc(50% - 45.5px); 
`;
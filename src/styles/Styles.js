import styled from 'styled-components';


export const LoaderSpinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const HeadingH1 = styled.div`
    position: relative;
    margin: 40px 0 30px;
    a {
        margin-left: 10px;
        color: #27ae60
    }
    .back-button {
        position: absolute;
        top: -20px;
        left: 0;
        margin-left: 0;
    }
`;

export const HeadingH2 = styled.div`
    margin: 30px 0 20px;
`;

export const ActionControls = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    a {
        margin: 0 5px;
        display: inline-block;
    }
    .primary { color: #3498db; }
    .danger { color: #c0392b; }
`

export const Table = styled.div`
    td, th {
        vertical-align: top;
        padding: 10px;
        ul li { margin-bottom: 10px; }
        .special-item {
            color: #27ae60;
            p {
                margin-bottom: 3px;
            }
        }
    }
`;

export const RecipeItems = styled.div`
    position: relative;
    margin-bottom: 30px;
    padding-bottom: 15px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.57);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.57);
    .image-holder {
        display: block;
        margin-bottom: 15px;
        height: 200px;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
        }
    }
    a {
        text-decoration: none;
    }
    h2 {
        padding: 0 15px;
    }
    p {
        margin-bottom: 3px;
        padding: 0 15px;
    }
`;
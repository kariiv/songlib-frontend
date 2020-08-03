import React from "react";
import { ver } from '../../config';
import {Container} from 'react-bootstrap';

export default () => {
    return (
        <footer className="sticky-footer bg-white">
             <Container className="my-auto">
                  <div className="copyright text-center my-auto">
                       <span>Copyright &copy; Mr.Toruabi 2020 v{ver}</span>
                  </div>
             </Container>
        </footer>
    )
}
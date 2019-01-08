import React from 'react';
import Modal from './modal.jsx';
import AddItem from './additem.jsx';


class SideNav extends React.Component {

    render() {
        let brands;

        console.log(this.props.brands);

        if(this.props.brands.length > 0) {
            brands = this.props.brands.map(function (item, i) {
                return <li><a href={"/getitems?f=e&b=" + item}>{item}</a></li>
            });
        } else {
            brands = "";
        }

        return (
            <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Collapsible Sidebar</h3>
                    </div>

                    <ul className="list-unstyled components">
                        <li className="active"><a href="/getitems">All Items</a></li>
                        <li><Modal modal={"additem"} btnTxt={"Add Item"}><AddItem /></Modal></li>
                        <li>
                            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Filter<i className="fas fa-caret-down"></i></a>
                            <ul className="collapse list-unstyled" id="homeSubmenu">
                                <li>
                                    <a href="#brandSubmenu" data-toggle="collapse" aria-expanded="false">Brand<i className="fas fa-caret-down"></i></a>
                                    <ul className="collapse list-unstyled" id="brandSubmenu">
                                        {brands}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><a href={"/getitems?f=e"}>Get eBay Items</a></li>
                    </ul>
                </nav>

                <div id="content">
                    <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
                        <i className="fas fa-angle-left"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default SideNav;
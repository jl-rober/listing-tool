const React = require('react');

class ebaylocations extends React.Component {

    render() {

        let locations = this.props.locations.map(function(item,i) {
            return <div className="card">
                <div className="card-header" id={"locHeading" + i}>
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={"#locCollapse" + i}
                                aria-expanded="true" aria-controls={"locCollapse" + i}>
                            {item.name}
                        </button>
                    </h5>
                </div>

                <div id={"locCollapse" + i} className="collapse" aria-labelledby={"locHeading" + i} data-parent="#accordion1">
                    <div className="card-body">
                        <span>Location Instructions</span>
                        <p>{item.locationInstructions}</p>
                        <a href={"/setDefaultLocation?locId=" + item.location.locationId} class="btn btn-primary">Set Default Location</a>
                    </div>
                </div>
            </div>
        });

        return (
                <div className="ebaylocations">
                    <div className="accordion" id="accordion1">
                        {locations}
                    </div>
                </div>

        );
    };
}

<div className="accordion" id="accordion">
    <div className="card">
        <div className="card-header" id="headingOne">
            <h5 className="mb-0">
                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                    Collapsible Group Item #1
                </button>
            </h5>
        </div>

        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div className="card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
        </div>
    </div>
</div>

module.exports = ebaylocations;
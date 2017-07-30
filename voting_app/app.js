const ProductList = React.createClass({
	sortType: 'desc',
  getInitialState: function() {
    return {
      products: [],
			sortType: null
    };
  },
  componentDidMount: function() {
    this.updateState();
  },
  updateState: function() {
		const sortType = this.sortType;
    const products = Data.sort((a, b) => {
      return (b.votes - a.votes) * (sortType === 'desc' ? 1 : -1);
    });
    this.setState({ products: products , sortType: sortType});
  },
  handleProductUpVote: function(productId) {
    this.handleProductVote(productId, 1);
  },
  handleProductDownVote: function(productId) {
    this.handleProductVote(productId, -1);
  },
  handleProductVote: function(productId, increment) {
    Data.forEach((el) => {
      if(el.id === productId) {
        el.votes = el.votes + increment;
        return;
      }
    });
    this.updateState();
  },
	handleSortDirectionChange: function() {
		this.sortType = this.sortType === 'desc' ? 'asc' : 'desc';
		this.updateState();
	},
  render: function() {
    const products = this.state.products.map((product) => {
      return(
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
					onUpVote={this.handleProductUpVote}
					onDownVote={this.handleProductDownVote}

        />
      );
    });
    return(
			<div>
				<button onClick={this.handleSortDirectionChange}>
					Sort direction: {this.state.sortType} (click to change!)
				</button>
	      <div className='ui items'>
	        {products}
	      </div>
	    </div>
    );
  },
});

const Product = React.createClass({
  handleUpVote: function() {
    this.props.onUpVote(this.props.id);
  },
  handleDownVote: function() {
    this.props.onDownVote(this.props.id);
  },
  render: function() {
    return(
      <div className='item'>
        <div className='image'>
        <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            {this.props.votes}
						<a onClick={this.handleDownVote}>
							<i className='large caret down icon'></i>
						</a>
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);

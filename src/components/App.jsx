import React, { Component } from 'react';
// import Loader from 'react-loader-spinner';
import fetchImage from './services/api';
import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './components/ImageGallery';
// import Notify from './components/Notify';
// import Modal from './components/Modal';
import Button from './Button/Button';
import css from './App.module.css';

class App extends Component {
  state = {
    images: [],
    totalHits: 0,
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    emptyNotify: false,
    // showPopup: false,
    showButton: false,
    // targetImage: null,
  };

  componentDidMount() {
    this.searchImages();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     this.setState({ page: 1 });
  //     this.searchImages();
  //   }
  //   if (prevState.page !== this.state.page) {
  //     this.searchImages();
  //   }
  // }

  searchImages() {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    fetchImage(searchQuery, page)
      .then(data => {
        console.log('page==>', page);
        console.log('data==>', data);
        if (page === 1) {
          this.setState({
            totalHits: data.totalHits,
            images: data.hits,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
        this.checkButtonAndNotify();
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }
  // когда жмем на кнопку поиск это срабатует
  onSubmit = value => {
    this.setState({ searchQuery: value });
    console.log(this.state);
  };

  onButtonMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // Вырубаем кнопку если закончились
  checkButtonAndNotify = () => {
    const { totalHits, images } = this.state;

    if (totalHits > images.length) {
      this.setState({ showButton: true });
    } else {
      this.setState({ showButton: false });
    }
  };

  onEmptyImagesNotify = () => {
    if (!totalHits) {
      this.setState({ emptyNotify: true });
    } else {
      this.setState({ emptyNotify: false });
    }
  };
  // toggleModal = ({ status, src, alt }) => {
  //   if (status) {
  //     this.setState({
  //       targetImage: { src, alt },
  //       showPopup: true,
  //     });
  //   } else {
  //     this.setState({
  //       targetImage: null,
  //       showPopup: false,
  //     });
  //   }
  // };

  render() {
    const {
      images,
      isLoading,
      error,
      emptyNotify,
      showPopup,
      targetImage,
      showButton,
    } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {/* {error && <Notify message={`Что-то не так: ${error.message}`} />}
        {isLoading && (
          <Loader type="BallTriangle" color="#e91616" height={80} width={80} />
        )}
        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}
        {emptyNotify && (
          <Notify message="Ничего не найдено, попробуй еще раз." />
        )}
        {showPopup && (
          <Modal
            src={targetImage.src}
            alt={targetImage.alt}
            toggleModal={this.toggleModal}
          />
        )} */}
        {showButton && <Button onClick={this.onButtonMoreClick} />}
      </div>
    );
  }
}

export default App;

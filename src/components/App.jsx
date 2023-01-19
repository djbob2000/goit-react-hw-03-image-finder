import React, { Component } from 'react';
import Loader from './Loader/Loader';
import fetchImage from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Notify from './Notify/Notify';
import Modal from './Modal/Modal';
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
    isModalOpen: false,
    targetImage: null,
  };

  // componentDidMount() {
  //   this.searchImages();
  // }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.searchQuery !== this.state.searchQuery) {
    //   this.setState({ page: 1 });
    //   this.searchImages();
    // }
    if (
      prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.searchImages();
    }
  }

  // когда жмем на кнопку поиск это срабатует
  onSubmit = value => {
    // this.setState({ searchQuery: value });
    this.setState({
      images: [],
      searchQuery: value,
      page: 1,
    });
  };

  searchImages = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const data = await fetchImage(searchQuery, page);

      const { hits, totalHits } = data;

      const filteredHits = hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );

      if (page === 1) {
        this.setState({
          totalHits: totalHits,
          images: filteredHits,
        });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...filteredHits],
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      this.setState({ error });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onButtonMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onEmptyImagesNotify = () => {
    const { totalHits } = this.state;
    if (!totalHits) {
      this.setState({ emptyNotify: true });
    } else {
      this.setState({ emptyNotify: false });
    }
  };

  toggleModal = ({ status, src, alt }) => {
    if (status) {
      this.setState({
        targetImage: { src, alt },
        isModalOpen: true,
      });
    } else {
      this.setState({
        targetImage: null,
        isModalOpen: false,
      });
    }
  };

  render() {
    const {
      images,
      totalHits,
      isLoading,
      error,
      emptyNotify,
      isModalOpen,
      targetImage,
      // showButton,
    } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {error && (
          <Notify message={`Huston, we have a problem: ${error.message}`} />
        )}

        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {images.length === 0 || totalHits === images.length || isLoading || (
          <Button onClick={this.onButtonMoreClick} />
        )}

        {isLoading && <Loader />}

        {emptyNotify && <Notify message="Nothing. Empty from your query." />}

        {isModalOpen && (
          <Modal
            src={targetImage.src}
            alt={targetImage.alt}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;

// searchImages() {
//   const { searchQuery, page } = this.state;

//   this.setState({ isLoading: true });

//   fetchImage(searchQuery, page)
//     .then(data => {
//       if (page === 1) {
//         this.setState({
//           totalHits: data.totalHits,
//           images: data.hits,
//         });
//       } else {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...data.hits],
//         }));
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       }
//       this.checkButtonAndNotify();
//     })
//     .catch(error => this.setState({ error }))
//     .finally(() => this.setState({ isLoading: false }));
// }
// было, переписал на async

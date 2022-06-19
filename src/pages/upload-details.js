import React,{ useState, useCallback } from "react";
import cn from "classnames";
import { useStateContext } from "../utils/context/StateContext";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Icon from "../components/Icon";
import TextInput from "../components/TextInput";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import OAuth from '../components/OAuth';
import Preview from "../screens/UploadDetails/Preview";
import Cards from "../screens/UploadDetails/Cards";
import FolowSteps from "../screens/UploadDetails/FolowSteps";
import { getAllDataByType, uploadMediaFiles } from "../lib/cosmic";
import { OPTIONS } from "../utils/constants/appConstants";
import createFields from "../utils/constants/createFields";

import styles from "../styles/pages/UploadDetails.module.sass";

const Upload = ({navigationItems, categoriesType}) => {
  const { categories, navigation, cosmicUser } = useStateContext();

  const [color, setColor] = useState(OPTIONS[0]);
  const [uploadMedia, setUploadMedia] = useState( '' );
  const [uploadFile, setUploadFile] = useState( '' );
  const [chooseCategory, setChooseCategory ] = useState( '' );
  const [fillFiledMessage, setFillFiledMessage] = useState(false);
  const [{ title, count, description, price  }, setFields] = useState(() => createFields);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAuthModal, setVisibleAuthModal] = useState( false );

  const [ visiblePreview,setVisiblePreview ] = useState( false );

  const handleUploadFile = async (uploadFile) => {
    const mediaData = await uploadMediaFiles(uploadFile);
    await setUploadMedia( mediaData?.[ 'media' ] );
  };

  const handleOAuth = useCallback(async (user) => {
    !cosmicUser.hasOwnProperty('id') && setVisibleAuthModal( true );

    if( !user && !user?.hasOwnProperty( 'id' ) ) return;
    user && await handleUploadFile( uploadFile );
  }, [cosmicUser, uploadFile]);

  const handleUpload = async ( e ) => {
    setUploadFile( e.target.files[ 0 ] );

    authToken ?
      handleUploadFile( e.target.files[ 0 ] ) :
      handleOAuth('upload');
  };

  const handleChange = ({ target: { name, value } }) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    } ) );

  const handleChooseCategory = useCallback( ( index ) => {
    setChooseCategory( index );
  },[] );

    const previewForm = useCallback(() => {
      if( title && count && price && uploadMedia ) {
        fillFiledMessage && setFillFiledMessage( false );
        setVisiblePreview( true );
      } else {
        setFillFiledMessage( true );
      }
    },[count, fillFiledMessage, price, title, uploadMedia]);

  const submitForm = useCallback( async ( e ) => {
    e.preventDefault();

    !authToken && handleOAuth();

    if(authToken && (title && color && count && price && uploadMedia) ) {
      fillFiledMessage && setFillFiledMessage( false );

      await fetch( 'api/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, description, price, count, color, category: chooseCategory, image: uploadMedia['name'], })
      });

      await setVisibleModal( true );

    } else {
      setFillFiledMessage( true );
    }
  },[chooseCategory, color, count, description, fillFiledMessage, handleOAuth, price, title, uploadMedia]);

  return (
      <Layout navigationPaths={navigationItems[0]?.metadata || navigation}>
        <div className={cn("section", styles.section)}>
          <div className={cn("container", styles.container)}>
            <div className={styles.wrapper}>
              <div className={styles.head}>
                <div className={cn("h2", styles.title)}>
                  Create single collectible
                </div>
              </div>
              <form className={styles.form} action="" onSubmit={submitForm}>
                <div className={styles.list}>
                  <div className={styles.item}>
                    <div className={styles.category}>Upload file</div>
                    <div className={styles.note}>
                      Drag or choose your file to upload
                    </div>
                    <div className={styles.file}>
                      <input
                        className={styles.load}
                        type="file"
                        onChange={handleUpload}
                      />
                      <div className={styles.icon}>
                        <Icon name="upload-file" size="24" />
                      </div>
                      <div className={styles.format}>
                        PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                      </div>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.category}>Item Details</div>
                    <div className={styles.fieldset}>
                      <TextInput
                        className={styles.field}
                        label="Item title"
                        name="title"
                        type="text"
                        placeholder='e. g. Readable Title'
                        onChange={handleChange}
                        value={title}
                        required
                      />
                      <TextInput
                        className={styles.field}
                        label="Description"
                        name="description"
                        type="text"
                        placeholder="e. g. Description"
                        onChange={handleChange}
                        value={description}
                        required
                      />
                      <div className={styles.row}>
                        <div className={styles.col}>
                          <div className={styles.field}>
                            <div className={styles.label}>Colors</div>
                            <Dropdown
                              className={styles.dropdown}
                              value={color}
                              setValue={setColor}
                              options={OPTIONS}
                            />
                          </div>
                        </div>
                        <div className={styles.col}>
                          <TextInput
                            className={styles.field}
                            label="Price"
                            name="price"
                            type="text"
                            placeholder="e. g. Price"
                            onChange={handleChange}
                            value={price}
                            required
                          />
                        </div>
                        <div className={styles.col}>
                          <TextInput
                            className={styles.field}
                            label="Count"
                            name="count"
                            type="text"
                            placeholder="e. g. Count"
                            onChange={handleChange}
                            value={count}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.options}>
                  <div className={styles.category}>Choose collection</div>
                  <div className={styles.text}>
                    Choose an exiting Categories
                  </div>
                  <Cards className={styles.cards} handleChoose={handleChooseCategory} items={categoriesType || categories['type']} />
                </div>
                <div className={styles.foot}>
                  <button
                    className={cn("button-stroke tablet-show", styles.button)}
                    onClick={previewForm}
                    type="button"
                  >
                    Preview
                  </button>
                  <button
                    className={cn("button", styles.button)}
                    onClick={submitForm}
                    type="submit"
                  >
                    <span>Create item</span>
                    <Icon name="arrow-next" size="10" />
                  </button>
                  {fillFiledMessage && <div className={styles.saving}>
                    <span>Please fill all fields</span>
                    <Loader className={styles.loader} />
                  </div> }
                </div>
              </form>
            </div>
            <Preview
              className={cn( styles.preview,{ [ styles.active ]: visiblePreview } )}
              info={{ title, color, count, description, price }}
              image={uploadMedia?.['imgix_url']}
              onClose={() => setVisiblePreview(false)}
            />
          </div>
        </div>
        <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <FolowSteps className={styles.steps} />
        </Modal>
        <Modal visible={visibleAuthModal} onClose={() => setVisibleAuthModal(false)}>
          <OAuth className={styles.steps} handleOAuth={handleOAuth} handleClose={() => setVisibleAuthModal(false)} />
        </Modal>
      </Layout>
  );
};

export default Upload;

export async function getServerSideProps() {
  const navigationItems = await getAllDataByType( 'navigation' ) || [];
  const categoryTypes = await getAllDataByType( 'categories' ) || [];

  const categoriesType = categoryTypes?.reduce((arr,{ title,id }) => {
      return { ...arr, [id]: title };
    },{} );

  return {
    props: { navigationItems, categoriesType },
  }
}
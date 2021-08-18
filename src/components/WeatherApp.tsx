import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import '../styles/weather/all.scss'
import iconClose from '../assets/weather/iconClose.svg'
import iconCloseRound from '../assets/weather/iconCloseRound.svg'
import iconCloudyDay from '../assets/weather/iconCloudyDay.svg'
import iconRainyDay from '../assets/weather/iconRainyDay.svg'
import iconSnowfall from '../assets/weather/iconSnowfall.svg'
import iconSunny from '../assets/weather/iconSunny.svg'
import { ApplicationState, GetWeatherSelectorResult, City } from '../types'
import { getWeather, getCities, getCity, getOpenSearch } from '../redux/selectors/weatherApp'
import {
  loadCities,
  loadWeather,
  setOpenSearch,
  loadCitiesSuccess,
  loadInitialState,
} from '../redux/actions/weatherApp'
import TopLoader from './ui/top-loader/TopLoader'
import MainLoader from './ui/main-loader/MainLoader'

export default function WeatherApp() {
  const [search, setSearch] = React.useState('')
  const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  const dispatch = useDispatch()

  const weather = useSelector<ApplicationState, GetWeatherSelectorResult>(getWeather)
  const cities = useSelector<ApplicationState, City[]>(getCities)
  const city = useSelector<ApplicationState, string | null>(getCity)
  const openSearch = useSelector<ApplicationState, boolean>(getOpenSearch)

  useEffect(() => {
    dispatch(loadInitialState())
  }, [dispatch])

  useEffect(() => {
    if (openSearch) inputRef?.current?.focus()
  }, [openSearch])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      dispatch(loadCities(search))
    }
  }

  const handleClickCity = (name: string) => {
    dispatch(loadWeather(name))
    handleClearSearch()
    handleOpenSearch()
  }

  const loadCitiesDebouncer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value

    if (text.length >= 3 && !search.includes(text)) dispatch(loadCities(text))

    setSearch(text)
  }

  const handleSearchInputChange = debounce(loadCitiesDebouncer, 1000, { leading: true })

  const handleOpenSearch = () => {
    if (!city && openSearch) return

    if (!search.length) dispatch(loadCitiesSuccess([]))

    dispatch(setOpenSearch(!openSearch))
  }

  const handleClearSearch = () => {
    setSearch('')
    dispatch(loadCitiesSuccess([]))
  }

  const getIcon = (text: string) => {
    const query = text.toLowerCase()

    switch (true) {
      case query.includes('sun') || query.includes('clear'):
        return iconSunny
      case query.includes('rain'):
        return iconRainyDay
      case query.includes('snow') || query.includes('sleet'):
        return iconSnowfall
      default:
        return iconCloudyDay
    }
  }

  return (
    <div className="app">
      <TopLoader />
      <header className="app__header">
        <button className="app__btn-menu app__btn-menu--dotted" onClick={handleOpenSearch}>
          <span className="sr-only">Open menu</span>
        </button>
      </header>
      <main className="app__main">
        {city && weather && (
          <section className="weather">
            <img className="weather__icon" src={getIcon(weather.text)} alt="" />
            <strong className="weather__title">{weather.text}</strong>
            {city && (
              <>
                <span className="weather__location">{city}</span>
                <div className="weather__info">
                  <div className="weather-info">
                    {(
                      <div className="weather-info__item">
                        <strong className="weather-info__title">{weather.temp || 0}°</strong>
                        <span className="weather-info__desc">Feels like</span>
                      </div>
                    )}
                    {weather.wind && (
                      <div className="weather-info__item">
                        <strong className="weather-info__title">{weather.wind} km/h</strong>
                        <span className="weather-info__desc">Wind speed</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </main>
      <aside
        className={classnames({
          app__aside: true,
          'app__aside--show': openSearch,
        })}
      >
        <section className="weather-search">
          <header className="weather-search__header">
            <strong className="weather-search__title">Choose city</strong>
            <button className="app__btn-menu weather-search__btn-close" onClick={handleOpenSearch}>
              <img width={18} height={18} src={iconClose} alt="close" />
            </button>
          </header>
          <div className="weather-search-input">
            <input
              ref={inputRef}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
              className="weather-search-input__field"
              placeholder="Search"
              autoFocus
              value={search}
            />
            {!!search.length && (
              <button onClick={handleClearSearch} className="app__btn-menu weather-search-input__btn-clear">
                <img width={14} height={14} src={iconCloseRound} alt="close" />
              </button>
            )}
          </div>
          <ul className="weather-search-suggestion">
            {cities.map((city: City) => (
              <li
                onClick={() => {
                  handleClickCity(city?.name)
                }}
                key={city?.id}
                className="weather-search-suggestion__item"
              >
                {city?.name}
              </li>
            ))}
          </ul>
        </section>
      </aside>
      <MainLoader />
    </div>
  )
}

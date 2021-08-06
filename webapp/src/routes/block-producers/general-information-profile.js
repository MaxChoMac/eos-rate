import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import countries from 'i18n-iso-countries'
import Grid from '@material-ui/core/Grid'
import _get from 'lodash.get'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import formatNumber from 'utils/formatNumber'
import getAverageValue from 'utils/getAverageValue'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/es.json'))

const _getCountryName = (country = null, locationNumber, defaultMessage) => {
  const { i18n } = useTranslation()
  const language = (i18n.language || 'en').substring(0, 2)
  const countryNameByLocationNumber = countries.getName(
    locationNumber,
    language
  )

  if (countryNameByLocationNumber) return countryNameByLocationNumber

  const countryNameByISO = countries.getName(country, language)

  if (countryNameByISO) return countryNameByISO

  return defaultMessage
}

const SocialNetworks = ({ classes, producer }) => {
  const { t } = useTranslation('profile')
  const github = _get(producer, 'org.social.github')
  const twitter = _get(producer, 'org.social.twitter')
  const linkedin = _get(producer, 'org.social.linkedin')
  const telegram = _get(producer, 'org.social.telegram')
  const instagram = _get(producer, 'org.social.instagram')

  return (
    <Grid container direction='column' className={classes.category}>
      <Typography variant='h6' className={classes.title}>
        {t('social')}
      </Typography>
      <Box className={classes.marginLeftBox}>
        {github && (
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              GitHub:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              <a
                href={`https://github.com/${github}`}
                className={classes.links}
                target='_blank'
                rel='noopener noreferrer'
              >
                {github}
              </a>
            </Typography>
          </Grid>
        )}
        {twitter && (
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              Twitter:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              <a
                href={`https://twitter.com/${twitter}`}
                className={classes.links}
                target='_blank'
                rel='noopener noreferrer'
              >
                {twitter}
              </a>
            </Typography>
          </Grid>
        )}
        {linkedin && (
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              LinkedIn:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              <a
                href={`https://www.linkedin.com/in/${linkedin}`}
                className={classes.links}
                target='_blank'
                rel='noopener noreferrer'
              >
                {linkedin}
              </a>
            </Typography>
          </Grid>
        )}
        {telegram && (
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              Telegram:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              <a
                href={`https://web.telegram.org/#/${telegram}`}
                className={classes.links}
                target='_blank'
                rel='noopener noreferrer'
              >
                {telegram}
              </a>
            </Typography>
          </Grid>
        )}
        {instagram && (
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              Instagram:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              <a
                href={`https://www.instagram.com/${instagram}`}
                className={classes.links}
                target='_blank'
                rel='noopener noreferrer'
              >
                {instagram}
              </a>
            </Typography>
          </Grid>
        )}
      </Box>
    </Grid>
  )
}

const WebsiteLegend = ({ classes, webInfo }) => {
  const { t } = useTranslation('profile')

  const content = webInfo ? (
    <Box className={classes.category}>
      <Typography variant='h6' className={classes.title}>
        {t('websiteInfo')}:
      </Typography>
      <Box className={classes.marginLeftBox}>
        <Typography variant='subtitle1' style={{ fontWeight: 500 }}>
          {webInfo.websiteText}
        </Typography>
      </Box>
    </Box>
  ) : null

  return (
    <Grid item xs={12} className={classes.websiteLegend}>
      {content}
    </Grid>
  )
}

const GeneralInformation = ({ classes, producer = {} }) => {
  const { t } = useTranslation('profile')

  const webpageURL = _get(producer, 'system.url')
  const totalVotes = _get(producer, 'system.votesInEos') || 0
  const countryName = _getCountryName(
    _get(producer, 'bpjson.org.location.country', null),
    _get(producer, 'system.location', null),
    t('noCountryName')
  )

  return (
    <>
      <Grid container direction='column' className={classes.category}>
        <Typography variant='h6' className={classes.title}>
          {t('generalInformation')}
        </Typography>
        <Box className={classes.marginLeftBox}>
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              {t('account')}:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              {_get(producer, 'system.owner', '- -')}
            </Typography>
          </Grid>
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              {t('location')}:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              {countryName}
            </Typography>
          </Grid>
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              {t('website')}:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              {webpageURL ? (
                <a
                  href={webpageURL}
                  className={classes.links}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {webpageURL}
                </a>
              ) : (
                '- -'
              )}
            </Typography>
          </Grid>
          <Grid container direction='row'>
            <Typography variant='subtitle1' className={classes.subTitle}>
              {t('votes')}:
            </Typography>
            <Typography
              variant='subtitle1'
              className={classNames(classes.value, classes.subTitle)}
            >
              {formatNumber(parseFloat(totalVotes), 0)}
            </Typography>
          </Grid>
        </Box>
      </Grid>
      <Grid container className={classes.category}>
        <Grid container justify='center' md={4} xs={12}>
          <Grid item md={12} xs={12}>
            <Typography variant='h6' className={classes.title}>
              {t('eosRates')}
            </Typography>
          </Grid>
          <Grid item md={11} xs={6}>
            <Box style={{ display: 'flex' }}>
              <Typography variant='subtitle1' className={classes.subTitle}>
                {t('rates')}:
              </Typography>
              <Typography
                variant='subtitle1'
                className={classNames(classes.value, classes.subTitle)}
              >
                {_get(producer, 'ratings_cntr', null) || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={11} xs={5}>
            <Box style={{ display: 'flex' }}>
              <Typography variant='subtitle1' className={classes.subTitle}>
                {t('average')}:
              </Typography>
              <Typography
                variant='subtitle1'
                className={classNames(classes.value, classes.subTitle)}
              >
                {getAverageValue(_get(producer, 'average', 0))}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justify='center' md={4} xs={12}>
          <Grid item md={12} xs={12}>
            <Typography variant='h6' className={classes.title}>
              {t('edenRates')}
            </Typography>
          </Grid>
          <Grid item md={11} xs={6}>
            <Box style={{ display: 'flex' }}>
              <Typography variant='subtitle1' className={classes.subTitle}>
                {t('rates')}:
              </Typography>
              <Typography
                variant='subtitle1'
                className={classNames(classes.value, classes.subTitle)}
              >
                {_get(producer, 'ratings_cntr', null) || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={11} xs={5}>
            <Box style={{ display: 'flex' }}>
              <Typography variant='subtitle1' className={classes.subTitle}>
                {t('average')}:
              </Typography>
              <Typography
                variant='subtitle1'
                className={classNames(classes.value, classes.subTitle)}
              >
                {getAverageValue(_get(producer, 'average', 0))}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container justify='center' md={4} xs={12}>
          <Grid item md={12} xs={12}>
            <Typography variant='h6' className={classes.title}>
              {t('tatolRates')}
            </Typography>
          </Grid>
          <Grid item md={11} xs={6}>
            <Box style={{ display: 'flex' }}>
              <Typography variant='subtitle1' className={classes.subTitle}>
                {t('rates')}:
              </Typography>
              <Typography
                variant='subtitle1'
                className={classNames(classes.value, classes.subTitle)}
              >
                {_get(producer, 'ratings_cntr', null) || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item md={11} xs={5}>
            <Box style={{ display: 'flex' }}>
              <Typography variant='subtitle1' className={classes.subTitle}>
                {t('average')}:
              </Typography>
              <Typography
                variant='subtitle1'
                className={classNames(classes.value, classes.subTitle)}
              >
                {getAverageValue(_get(producer, 'average', 0))}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

SocialNetworks.propTypes = {
  classes: PropTypes.object,
  producer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

GeneralInformation.propTypes = {
  classes: PropTypes.object,
  producer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
}

WebsiteLegend.propTypes = {
  classes: PropTypes.object,
  webInfo: PropTypes.object
}

export { SocialNetworks, GeneralInformation, WebsiteLegend }

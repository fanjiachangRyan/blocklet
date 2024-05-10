import { Avatar, Box, Typography, Breadcrumbs, Link, FormGroup } from '@mui/material';
import { SettingButton, Input } from '../components';
import { useTheme } from '@emotion/react';
import { useStyles } from '../styles';
import { useEffect, useState } from 'react';
import api from '../libs/api';

export type UserInfo = {
  name: string;
  nation: string;
  province: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
};

const initData: UserInfo = {
  name: 'JC',
  nation: '',
  province: '',
  city: '',
  country: '',
  email: '',
  phoneNumber: '',
};

export const Setting = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [loading, setLoading] = useState<boolean>(false);
  const [setting, settingToggle] = useState<boolean>(false);
  const [name, setName] = useState<string>('JC');
  const [nation, setNation] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const getUser = async () => {
    try {
      const rs: UserInfo = (await api.get('/getUser')) ?? (initData as UserInfo);

      setName(rs.name);
      setNation(rs.nation);
      setProvince(rs.province);
      setCity(rs.city);
      setCountry(rs.country);
      setEmail(rs?.email);
      setPhoneNumber(rs?.phoneNumber);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async () => {
    const params: UserInfo = {
      name,
      nation,
      province,
      city,
      country,
      email,
      phoneNumber,
    };

    try {
      setLoading(true);
      await api.post('/updateUser', params);
    } finally {
      setLoading(false);
      settingToggle(false);
    }
  };

  return (
    <Box className={styles.Container}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          height: '100px',
          minHeight: '100px',
          width: 'calc(100% - 60px)',
          background: 'black',
          px: '30px',
          justifyContent: 'space-between',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}>
          <Avatar sx={{ width: 30, height: 30, fontSize: '14px' }}>
            {(name ?? 'JC').substring(0, 1).toUpperCase()}
          </Avatar>
          <Breadcrumbs aria-label="breadcrumb" separator={<Box sx={{ fontSize: 16, color: 'gray' }}>/</Box>}>
            <Link underline="hover" color="grey" fontSize={'16px'}>
              Setting
            </Link>
            <Typography sx={{ color: 'white', fontSize: '16px' }}>Profile</Typography>
          </Breadcrumbs>
        </Box>
        {setting ? (
          <SettingButton
            disabled={loading}
            variant="text"
            sx={{ color: 'gray' }}
            onClick={() => {
              if (!name.trim()) {
                alert(`名字不能为空！`);
                return;
              }
              handleSubmit();
            }}>
            Save
          </SettingButton>
        ) : (
          <SettingButton disabled={loading} variant="text" sx={{ color: 'gray' }} onClick={() => settingToggle(true)}>
            Modify
          </SettingButton>
        )}
      </Box>
      <Box className={styles.Wrap}>
        <Box className={styles.AvatarWrap}>
          <Box className={styles.AvatarImg}>
            <Avatar sx={{ width: '100%', height: '100%' }}>{(name ?? 'JC').substring(0, 1).toUpperCase()}</Avatar>
          </Box>
          <Box className={styles.AvatarName}>{name}</Box>
        </Box>
        <Box
          sx={{
            flex: '1',
            padding: '20px 40px',
            overflow: 'hidden',
            overflowY: 'auto',
          }}>
          <Box
            sx={{
              color: 'white',
              fontSize: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              pb: '20px',
            }}>
            Personal Profile
          </Box>
          <FormGroup sx={{ width: '100%' }}>
            <Box className={styles.FormItem}>
              <Box sx={{ color: 'white' }}>Name:</Box>
              <Input
                required
                disableUnderline
                disabled={!setting}
                value={name}
                onChange={(e) => {
                  setName(e.target.value?.trim?.() ?? '');
                }}
              />
            </Box>
            <Box className={styles.FormItem}>
              <Box sx={{ color: 'white' }}>Nation:</Box>
              <Input
                disableUnderline
                disabled={!setting}
                value={nation}
                onChange={(e) => {
                  setNation(e.target.value?.trim?.() ?? '');
                }}
              />
            </Box>
            <Box className={styles.FormItem}>
              <Box sx={{ color: 'white' }}>Province:</Box>
              <Input
                disableUnderline
                disabled={!setting}
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value?.trim?.() ?? '');
                }}
              />
            </Box>
            <Box className={styles.FormItem}>
              <Box sx={{ color: 'white' }}>City:</Box>
              <Input
                disableUnderline
                disabled={!setting}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value?.trim?.() ?? '');
                }}
              />
            </Box>
            <Box className={styles.FormItem}>
              <Box sx={{ color: 'white' }}>Country:</Box>
              <Input
                disableUnderline
                disabled={!setting}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value?.trim?.() ?? '');
                }}
              />
            </Box>
            <Box className={styles.FormItem}>
              <Box sx={{ color: 'white' }}>Email:</Box>
              <Input
                disableUnderline
                disabled={!setting}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value?.trim?.() ?? '');
                }}
              />
            </Box>
            <Box className={styles.FormItem}>
              <Box sx={{ color: 'white' }}>Phone Number:</Box>
              <Input
                disableUnderline
                disabled={!setting}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value?.trim?.() ?? '');
                }}
              />
            </Box>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

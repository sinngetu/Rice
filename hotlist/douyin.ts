import { HotItem } from './interface'
import { getHash, now } from '../utils'

const id = [1, 2] // hot, social

export default async function() {
    let data: HotItem[]

    try {
        const res = await Promise.all([
            // 热榜
            fetch('https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&source=6&board_type=0&board_sub_type=&update_version_code=170400&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=126.0.0.0&browser_online=true&engine_name=Blink&engine_version=126.0.0.0&os_name=Windows&os_version=10&cpu_core_num=20&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7386992118139504169&msToken=bagmyHvWZKYIci-9VVLG--W7wT5Epb3JNFAm3GJhB-CUWmv3yvPDbOHk3L4GEunh-wdYPehhEkTPQxr-tXyNLlL79hCKQzTJctnAwfJPYf58S3Wi7H0gO3JKkjy2&a_bogus=E6WMBDzgdEfP6dWk5lALfY3q63-3Y0il0trEMD2fkx3%2Fk639HMO29exEGZUvrfRjNs%2FDIejjy4haT3nprQ2J8qw39W4x%2F2Cpmg00t-P2sogS53iJeyUgrzXw-hsAteaQsv-5iQfkqw%2FeFuRploCcmhcWOLZCcHhMHjDISpcG298%3D&verifyFp=verify_ly4av20r_1IF1u10Q_V8lS_4b7f_BRzq_ScWPylM0tnOd&fp=verify_ly4av20r_1IF1u10Q_V8lS_4b7f_BRzq_ScWPylM0tnOd', {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
                    'priority': 'u=1, i',
                    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'cookie': 'ttwid=1%7CXjN5BcH7Ke2arfC-DGl1VWJLsxCU-TlCc07PlQCpkck%7C1719918153%7Ca9accc05f2fcc49e0f8098bf4c6c7f4effc636e708df8c636a14696d0a6074cd; UIFID_TEMP=3c3e9d4a635845249e00419877a3730e2149197a63ddb1d8525033ea2b3354c2f2e160cf1f7b867738a5968339b6152b89e4cece7a1dc0d3b9653bf8a40787dfe9cbb293cbe3d41ff58e6e619de58b8f; douyin.com; s_v_web_id=verify_ly4av20r_1IF1u10Q_V8lS_4b7f_BRzq_ScWPylM0tnOd; device_web_cpu_core=20; device_web_memory_size=8; architecture=amd64; dy_swidth=2560; dy_sheight=1440; csrf_session_id=5c3486cb5c5d5f38479980885951eb67; strategyABtestKey=%221719918155.89%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.5%7D; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A1%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A1%7D%22; fpk1=U2FsdGVkX19TEIhnzSTJlhv07UqzlCl6z48EnBZMPO0tZlSsJtemVuW0ce26T9or45IAP30TC3bGDmA+Le/gbw==; fpk2=f1f6b29a6cc1f79a0fea05b885aa33d0; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; passport_csrf_token=ff056669b165584cbb44a599681187d9; passport_csrf_token_default=ff056669b165584cbb44a599681187d9; bd_ticket_guard_client_web_domain=2; odin_tt=e2ba40793b690b6af1c43a8b5eb7bb7757db0d58599bc4926e1a830cecb155090d00a26f90d6d658bbedb2f3ddc89494ae7df6bba80141da2441f3dd9861faf55f85d67ed3b0d24c9614878d3de3f6ba; xgplayer_device_id=18988475649; xgplayer_user_id=823544906901; UIFID=3c3e9d4a635845249e00419877a3730e2149197a63ddb1d8525033ea2b3354c2f2e160cf1f7b867738a5968339b6152b93eae57bcff3232e9cc330f3f704f0c1f20f278df119bbc08412e79a5da30543d96043491d69c2fede4bbeafabbea627e4014f9925994c74bc6373c5013a7462be43c601a40b231274d8899a0da8a146bba7ebebb12d4ccbcb06fd7296265a7d5fc8101aeef80e07ee3c825fd282c380; pwa2=%220%7C0%7C1%7C0%22; WallpaperGuide=%7B%22showTime%22%3A1719918849746%2C%22closeTime%22%3A0%2C%22showCount%22%3A1%2C%22cursor1%22%3A12%2C%22cursor2%22%3A0%7D; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A2560%2C%5C%22screen_height%5C%22%3A1440%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A20%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22; biz_trace_id=6eb5341a; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCUFZRTVkzR2dBallWWjJrKzJDSk5wVWdXNW0xbUtVc1doUFI5U21WeEprVUZXbU81QTJFaitFM1R6N3BNN1pPWGtFNGFRWUdvejFIVkpQSlVwWjZDYzQ9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; home_can_add_dy_2_desktop=%221%22; download_guide=%222%2F20240702%2F0%22; IsDouyinActive=true',
                },
                referrer: 'https://www.douyin.com/discover',
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: null,
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            }),

            // 社会榜
            fetch('https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&source=6&board_type=2&board_sub_type=4&update_version_code=170400&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=en-US&browser_platform=Win32&browser_name=Chrome&browser_version=126.0.0.0&browser_online=true&engine_name=Blink&engine_version=126.0.0.0&os_name=Windows&os_version=10&cpu_core_num=20&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7386992118139504169&msToken=bagmyHvWZKYIci-9VVLG--W7wT5Epb3JNFAm3GJhB-CUWmv3yvPDbOHk3L4GEunh-wdYPehhEkTPQxr-tXyNLlL79hCKQzTJctnAwfJPYf58S3Wi7H0gO3JKkjy2&a_bogus=d68ZQQ8XmDIp6D6g5lALfY3q6V33Y0iW0trEMD2fqV3%2Fuy39HMYZ9exEGZvvAbRjNs%2FDIejjy4haT3nprQ2J8qw39W4x%2F2Cpmg00t-P2sogS53iJeyUgrzXw-hsAteaQsv-5iQfkqw%2FeFuRploCcmhcWOLZCcHhMHjDISpcG2Cu%3D&verifyFp=verify_ly4av20r_1IF1u10Q_V8lS_4b7f_BRzq_ScWPylM0tnOd&fp=verify_ly4av20r_1IF1u10Q_V8lS_4b7f_BRzq_ScWPylM0tnOd', {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
                    "priority": "u=1, i",
                    'sec-ch-ua': '\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '\"Windows\"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'cookie': 'ttwid=1%7CXjN5BcH7Ke2arfC-DGl1VWJLsxCU-TlCc07PlQCpkck%7C1719918153%7Ca9accc05f2fcc49e0f8098bf4c6c7f4effc636e708df8c636a14696d0a6074cd; UIFID_TEMP=3c3e9d4a635845249e00419877a3730e2149197a63ddb1d8525033ea2b3354c2f2e160cf1f7b867738a5968339b6152b89e4cece7a1dc0d3b9653bf8a40787dfe9cbb293cbe3d41ff58e6e619de58b8f; douyin.com; s_v_web_id=verify_ly4av20r_1IF1u10Q_V8lS_4b7f_BRzq_ScWPylM0tnOd; device_web_cpu_core=20; device_web_memory_size=8; architecture=amd64; dy_swidth=2560; dy_sheight=1440; csrf_session_id=5c3486cb5c5d5f38479980885951eb67; strategyABtestKey=%221719918155.89%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.5%7D; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A1%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A1%7D%22; fpk1=U2FsdGVkX19TEIhnzSTJlhv07UqzlCl6z48EnBZMPO0tZlSsJtemVuW0ce26T9or45IAP30TC3bGDmA+Le/gbw==; fpk2=f1f6b29a6cc1f79a0fea05b885aa33d0; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; passport_csrf_token=ff056669b165584cbb44a599681187d9; passport_csrf_token_default=ff056669b165584cbb44a599681187d9; bd_ticket_guard_client_web_domain=2; odin_tt=e2ba40793b690b6af1c43a8b5eb7bb7757db0d58599bc4926e1a830cecb155090d00a26f90d6d658bbedb2f3ddc89494ae7df6bba80141da2441f3dd9861faf55f85d67ed3b0d24c9614878d3de3f6ba; xgplayer_device_id=18988475649; xgplayer_user_id=823544906901; UIFID=3c3e9d4a635845249e00419877a3730e2149197a63ddb1d8525033ea2b3354c2f2e160cf1f7b867738a5968339b6152b93eae57bcff3232e9cc330f3f704f0c1f20f278df119bbc08412e79a5da30543d96043491d69c2fede4bbeafabbea627e4014f9925994c74bc6373c5013a7462be43c601a40b231274d8899a0da8a146bba7ebebb12d4ccbcb06fd7296265a7d5fc8101aeef80e07ee3c825fd282c380; pwa2=%220%7C0%7C1%7C0%22; WallpaperGuide=%7B%22showTime%22%3A1719918849746%2C%22closeTime%22%3A0%2C%22showCount%22%3A1%2C%22cursor1%22%3A12%2C%22cursor2%22%3A0%7D; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A2560%2C%5C%22screen_height%5C%22%3A1440%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A20%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22; biz_trace_id=6eb5341a; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCUFZRTVkzR2dBallWWjJrKzJDSk5wVWdXNW0xbUtVc1doUFI5U21WeEprVUZXbU81QTJFaitFM1R6N3BNN1pPWGtFNGFRWUdvejFIVkpQSlVwWjZDYzQ9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; home_can_add_dy_2_desktop=%221%22; download_guide=%222%2F20240702%2F0%22; IsDouyinActive=true'
                },
                referrer: 'https://www.douyin.com/discover',
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: null,
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
        ])

        data = (await Promise.all(res.map(r => r.json())))
            .map((raw, i) => raw.data.word_list.map((item: any) => ({
                hash: getHash(id[i], item.word),
                content: item.word,
                platform: id[i],
                date: now(id[i]),
                link: `https://www.douyin.com/hot/${item.sentence_id}/${encodeURIComponent(item.word)}`
            }))).flat()
    } catch(e) {
        data = [{
            hash: getHash(id[1], `${now(id[1])} 抖音这次没抓到`),
            content: `${now(id[1])} 抖音这次没抓到`,
            platform: id[1],
            date: now(id[1]),
            link: 'https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&source=6&board_type=0&board_sub_type=&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=116.0.0.0&browser_online=true&engine_name=Blink&engine_version=116.0.0.0&os_name=Windows&os_version=10&cpu_core_num=20&device_memory=8&platform=PC&downlink=1.05&effective_type=4g&round_trip_time=200&webid=7259603313640932903&msToken=w0oJlu-AzGkpX0L3_5c9W4fFiAQadJad4OD-Iysd3QEh_-Pok0gdNDFIYRsvY6pi0tr2uxCNqTbmn2HR-WTfjA9tBNzXXW1c05418EC-nrC6s849Jlo=&X-Bogus=DFSzswVL5bTAN9DktydS1e9WX7jU',
        } as HotItem]
    }

    return data
}

import { Box, Grid, SxProps, Theme } from '@mui/material'
import { Link } from 'react-router-dom'

const contentStyle: SxProps<Theme> = {
  color: '#777',
}

const createdByStyle: SxProps<Theme> = {
  color: '#777',
  fontSize: 10,
  textAlign: 'right',
}

// eslint-disable-next-line unused-imports/no-unused-vars
export const PrivacyPolicyPage: React.FC = () => {
  // direction="column": 縦方向に並べる
  // justifyContent="center": 縦方向の中間から並べる
  // alignItems="stretch": 横方向いっぱい利用する
  // spacing: 各 Grid Item ごとの間隔
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            個人情報取り扱いに関する基本方針
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトでは、ご利用頂くお客様の個人情報を適切に保護するため、個人情報の保護に関する法律、その他の関係法令を遵守すると共に、以下に定めるプライバシーポリシーに従って、個人情報を安全かつ適切に取り扱うことを宣言いたします。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            個人情報の定義
          </Box>
          <Box component="p" sx={contentStyle}>
            「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            個人情報の取得方法
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトはユーザーがお問い合わせをする際に名前（ニックネーム）、メールアドレス等の個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当サイトの提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。
          </Box>
          <Box component="h4" sx={contentStyle}>
            クッキー (Cookie)
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトでは、アクセス解析サービス、各種アフィリエイトプログラム、広告配信サービスを利用しております。これらの広告配信業者は、ユーザーのご興味に応じた商品やサービスの広告を表示するため、ユーザーの当サイトおよび他サイトへのアクセスに関する情報Cookieを使用することがございます。
            <br />
            <br />
            Cookieは、ユーザーが当サイトあるいは他サイトを閲覧された際、使用されたコンピューターやデバイス内に記録されます。ただし、この情報には、お名前・ご住所・メールアドレス・電話番号など個人を特定できるものは一切含まれません。
            <br />
            <br />
            Cookieによる情報収集を好まれない場合、ユーザーご自身でブラウザで受け入れを拒否するよう設定することも可能です。ただし、この設定により一部のコンテンツが正しく機能しない場合、またサービスが受けられない場合がございます。あらかじめご了承ください。
            <br />
            <br />
            なお、設定方法に関しては
            <Link
              to="https://policies.google.com/technologies/partner-sites?hl=ja"
              target="_blank"
            >
              Googleポリシーと規約
            </Link>
            にてご確認いただけます。
          </Box>
          <Box component="h4" sx={contentStyle}>
            アクセス解析ツール
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトでは、Googleの提供するアクセス解析ツール『Google
            Analytics』を使用しています。Google
            Analyticsはトラフィックデータの収集のためCookieを利用します。このトラフィックデータは匿名で収集されており、個人を特定するものではございません。
            <br />
            <br />
            ユーザーは、Cookieを無効化することにより、データの収集を拒否することができます。お使いのブラウザより設定をご確認ください。
            <br />
            <br />
            なお、この規約に関しては、
            <Link
              to="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
            >
              Google アナリティクス利用規約
            </Link>
            および
            <Link
              to="https://policies.google.com/technologies/partner-sites?hl=ja"
              target="_blank"
            >
              Googleポリシーと規約
            </Link>
            でご確認いただけます。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            個人情報の利用目的
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトが個人情報を収集・利用する目的は，以下のとおりです。
            <br />
            <br />
            当サイトのお問い合わせの際に，名前（ニックネーム）、メールアドレス等の個人情報を入力いただく場合がございます。
            <br />
            <br />
            これらの個人情報は，質問に対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり，個人情報をご提供いただく際の目的以外では利用いたしません。
            <br />
            <br />
            その他に，当サイトを不正・不当な目的で利用しようとするユーザーがいた場合，ユーザーの特定をし，ご利用をお断りするために利用します。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            当サイトが利用している広告サービス
          </Box>
          <Box component="h4" sx={contentStyle}>
            Googleアドセンス
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトは、第三者配信の広告サービス「Google
            Adsense（グーグルアドセンス）」を利用しています。当サイトにおいて広告が配信される過程で、Cookieやデバイス特有の情報、位置情報、当該デバイスから収集されるその他の情報が利用される場合があります。ただしその過程で個人を特定できる情報は収集されません。
            <br />
            <br />
            また、Google
            AdSenseに関して、このプロセスの詳細や情報が広告配信事業者に使用されないよう、ユーザーご自身で設定することができます。ただし、この設定により一部のコンテンツが正しく機能しない場合、またサービスが受けられない場合がございます。あらかじめご了承ください。
            <br />
            <br />
            なお、この設定方法に関しては
            <Link
              to="https://policies.google.com/technologies/partner-sites?hl=ja"
              target="_blank"
            >
              Googleポリシーと規約
            </Link>
            にてご確認いただけます。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            個人情報の管理方法
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトは第三者に皆さまの重要な情報を読み取られたり、改ざんされたりすることを防ぐために、SSLを使用しております。
            <br />
            <br />
            SSL(SecureSocketLayer)とはデータを暗号化して通信するセキュリティ機能です。SSLで暗号化することによってお客さまの個人情報をハッカーやクラッカーから守り、安全に情報を送信することができます。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            個人情報の第三者提供
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトは次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく第三者に個人情報を提供することはありません。
            <br />
            <br />
            ただし、個人情報保護法その他の法令で認められる場合を除きます。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            免責事項
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
            <br />
            <br />
            また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
            <br />
            <br />
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            リンクについて
          </Box>
          <Box component="p" sx={contentStyle}>
            当サイトは完全リンクフリーです。リンクを行う場合の当サイトへの許可や連絡は不要です。
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box component="h2" sx={contentStyle}>
            個人情報の取扱いに関する相談や苦情の連絡先
          </Box>
          <Box component="p" sx={contentStyle}>
            本ポリシーに関するお問い合わせは、
            <Link to="/contact">お問い合わせ</Link>ページにてご連絡ください。
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="flex-end">
        <Box component="p" sx={createdByStyle}>
          本ページで利用されているリソースの全ての権利は人狼ゲーム
          るる鯖にあります
          <br />
          Created by visualpaper
        </Box>
      </Grid>
    </>
  )
}

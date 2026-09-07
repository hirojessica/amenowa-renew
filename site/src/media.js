// Explicit slots only: case-study evidence and supplied portraits/product UI stay separate.
const photo=(key,alt,position='50% 50%')=>({src:`images/generated/${key}-20260907.webp`,alt,width:1536,height:1024,position});
const illustration=(key,alt)=>({src:`images/generated/${key}-20260907.webp`,alt,width:1983,height:793,fit:'contain'});

export const illustrativeMedia={
  '戦略づくり・対話の写真':photo('strategy-dialogue','地図を囲んで水と自然の戦略を話し合うイメージ'),
  '調査・地域活動の写真':photo('field-team','森の清流で採水と記録を行うフィールド調査のイメージ','50% 65%'),
  '発信・コミュニケーションの写真':photo('communication-story','森林や川の写真を整理して活動を伝えるイメージ'),
  '水・森林・地域の風景':photo('mission-watershed','川と森林、田畑と集落がつながる風景のイメージ'),
  '調査・フィールドワーク・チームの写真':photo('field-team','専門性の異なる人々が清流を調査するチームのイメージ','50% 68%'),
  '水質調査・採水の現場写真':photo('field-team','清流で水を採取し、周囲の環境を記録するイメージ','50% 65%'),
  '観測井戸・センサーの現場写真':photo('well-monitoring','観測井戸に測定ケーブルを下ろす作業のイメージ','55% 55%'),
  '森林・涵養活動の現場写真':photo('forest-care','森林の土壌と若木を手入れするイメージ','50% 65%'),
  '地域との対話・活動の写真':photo('communication-story','自然に関する活動の写真を選び発信を考えるイメージ'),
  '水評価アセスメント（CDP）の説明図':illustration('assessment-illustration','水の利用環境を把握し、評価と対話につなげる概念イラスト'),
  '水利用の見える化の説明図':illustration('monitoring-illustration','森林と地下水、観測から理解へのつながりを描いた概念イラスト'),
  '森林保全と水の涵養の説明図':illustration('forest-illustration','森林に降る雨と土壌への浸透、地下水と川のつながりを描いた概念イラスト'),
  'サステナブルブランドの構築の説明図':illustration('communication-illustration','環境活動から記録、地域との対話へつなげる概念イラスト'),
};

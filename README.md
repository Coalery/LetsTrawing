# LetsTrawing

트위치와 연동하는 그림 그리고 맞추기 게임 저장소

### Game Flow

```mermaid
stateDiagram-v2
state "로딩" as s0
state "스트리머 인증" as s1
state "스트리머가 게임 시작" as s2
state "횟수만큼 게임을 진행했는가" as s3
state "게임 진행" as s4
state "게임 종료" as s5

s0 --> s1
s1 --> s2
s2 --> s3
s3 --> s4: false
s4 --> s3
s3 --> s5: true
s5 --> s2
```

### GitHub Secrets

- `API_KEY`: 리포지토리에 대한 접근 권한을 갖는 깃헙 PAT 토큰을 만든 뒤에 넣어주시면 됩니다.
- `CHANNEL`: 스트리머의 아이디
    - ex) `https://twitch.tv/doralife12`에서 `doralife12`
- `USERNAME`: 봇의 이름
    - 아무거나 해도 상관 없습니다.
- `PASSWORD`: https://twitchapps.com/tmi/ 에 접속한 뒤에, 자신의 트위치 계정으로 로그인을 하면 토큰이 나옵니다. 해당 토큰을 넣으면 됩니다. 아래의 형식을 따릅니다.
    - oauth:xxx
import Card from "./Card"
import SplitContainer from "./SplitContainer"
import InterText from "./InterText"
import CustomButton from "./CustomButton"

//* Not a component right now but used like so
//* May refactor into a component later
const workoutCardFactory = (bind=false, onBind = () => {}, workout, index, router) => {
    const color = index % 2 === 0 ? 'orange' : 'red'

    const data = {
        id : workout.id,
        name : workout.name
    }

    return (
        <Card key={index} color={color} 
            onPress={() => router.push( {pathname : '/workoutDetails', params: {data : JSON.stringify(data)}} )}
        >
            <SplitContainer padding={40} gap={0} justifyContent="center">
                <InterText whiteText={true}>{workout.name}</InterText>
            </SplitContainer>

            {bind &&
                <SplitContainer direction="column" padding={20}>
                    <CustomButton title={'Bind'} onPress={() => onBind(data.id, data.name)}/>
                </SplitContainer>
            }
        </Card>
    )
}

export {workoutCardFactory};
import { LayoutAnimation } from 'react-native';

export default AnimationSettings = {

    softSpring: { //used in moveNoteScreen
        duration: 700,
        create: {
            duration:200,
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
        },
        update: {
            // duration:200,
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
        },
        delete: {
            duration:200,
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
        },
    },
}